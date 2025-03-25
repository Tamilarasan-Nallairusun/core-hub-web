"use client";

import AuthLayout from "@/components/auth.layout"
import Input from "@/components/controls/Input"
import Link from "next/link";
export default function Register() {
    return (
       <AuthLayout  title={"Register"}>
           <Input type={"text"} label="Email" placeholder="Email" focus/>
           <Input type={"password"}/>
           <Link href={'/login'}>Register</Link>
       </AuthLayout>
    )
}