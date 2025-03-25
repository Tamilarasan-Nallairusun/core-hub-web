"use client";
import AuthLayout from "@/components/auth.layout";
import Input from "@/components/controls/Input";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/controls/Button";
import { useAuth } from "@/context/AuthContext";
export default function Login() {
  const { login,loading } = useAuth();
  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email format").required("Email is required"),
          password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
        })}
        onSubmit={async (values) => {
          await login(values)
        }}
      >
        {() => (
          <Form>
            <Input type="text" label="Email" placeholder="Email" name="email" focus />
            <Input type="password" label="Password" placeholder="Password" name="password" />
            <Button type="submit" loading={loading} variant="primary" block>
              Login
            </Button>

            <p className="mt-4 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
