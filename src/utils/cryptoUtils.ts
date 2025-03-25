import { serialize, parse } from "cookie";

const COOKIE_NAME = "auth_data";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";

if (!SECRET_KEY) {
    throw new Error("Missing SECRET_KEY in environment variables");
}

const getKey = async (): Promise<CryptoKey> => {
    const keyBytes = Buffer.from(SECRET_KEY, "base64");

    if (keyBytes.length !== 32) {
        throw new Error("Invalid key length: AES key must be 256 bits (32 bytes)");
    }

    return await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
};

export const encryptData = async (data: object): Promise<string> => {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedData
    );

    return JSON.stringify({
        iv: Buffer.from(iv).toString("base64"),
        data: Buffer.from(new Uint8Array(encrypted)).toString("base64"),
    });
};

export const decryptData = async (encryptedString: string): Promise<object | null> => {
    try {
        const key = await getKey();
        const { iv, data } = JSON.parse(encryptedString);

        const ivArray = new Uint8Array(Buffer.from(iv, "base64"));
        const encryptedData = new Uint8Array(Buffer.from(data, "base64"));

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: ivArray },
            key,
            encryptedData
        );

        return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

export const saveToCookies = async (data: object) => {
    const encryptedData = await encryptData(data);
    document.cookie = serialize(COOKIE_NAME, encryptedData, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict",
    });
};

export const loadFromCookies = async (): Promise<object | null> => {
    const cookies = parse(document.cookie || "");
    if (cookies[COOKIE_NAME]) {
        return await decryptData(cookies[COOKIE_NAME]);
    }
    return null;
};

export const deleteFromCookies = () => {
    document.cookie = serialize(COOKIE_NAME, "", {
        path: "/",
        maxAge: -1, // Expire immediately
    });
};
