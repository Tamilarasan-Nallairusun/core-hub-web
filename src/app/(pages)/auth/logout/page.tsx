"use client"
import AuthLayout from "@/components/auth.layout";
import { deleteFromCookies } from "@/utils/cryptoUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(()=>{
    deleteFromCookies();
    router.push("/auth/login");
  },[])
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center h-32 items-center">
        <div className="w-12 h-12 border-5 border-gray-300 primary-border rounded-full animate-spin"></div>
        <span className="mt-2">Loading...</span>
      </div>
    </AuthLayout>
  );
}
