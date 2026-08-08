'use client'
import LoginForm from "@/features/auth/components/login-form"
import { useState, useCallback } from "react";
import type { LoginSchema } from "@/features/auth/types/type";
import { useLogin } from "@/features/auth/hooks/useAuth";

export default function Page(){

    const [ loginForm, setLoginForm ] = useState<LoginSchema>({
            email:'',
            password:'',
        })
    const { mutateAsync: login, isPending,} = useLogin();

    const handleSubmit = useCallback(async (loginForm:LoginSchema) => {
        await login({ email:loginForm.email, password:loginForm.password });
    },[login]);
    
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
            <section className="w-full md:max-w-md">
                  <LoginForm
                  email={loginForm.email}
                  handleEmail={(val) => setLoginForm((prev) => ({...prev,email:val}))}
                  handlePassword={(val) => setLoginForm((prev) => ({...prev,password:val}))}
                  password={loginForm.password}
                  loading={isPending}
                  login={() => handleSubmit(loginForm)}/>
            </section>
        </main>
    )
}


