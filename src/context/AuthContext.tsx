"use client"
import { createContext, useState, useContext, ReactNode } from "react";
import { BaseResponse } from "@/model/base.response.model";
import { LoginResponseModel } from "@/model/login.response.model";
import { useRouter } from "next/navigation";
import { deleteFromCookies, saveToCookies } from "@/utils/cryptoUtils";
import http from "@/utils/axios.service";

// Define context type
interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Define login credentials type
interface LoginCredentials {
  email: string;
  password: string;
}

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (values: LoginCredentials) => {
    setLoading(true);
      http.post<BaseResponse<LoginResponseModel>>("auth/login", values)
             .then(async (response) => {
               if(response.isSuccess){
               await saveToCookies(response.data);
                 setLoading(false);
                 router.push('/dashboard')
               }else{
                setLoading(false);
                 console.log(response.message);
               }
             })
             .catch((err: unknown) => {
                 console.error("Unexpected Error:", err);
             })
  };

  const logout = () => {
    deleteFromCookies();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
