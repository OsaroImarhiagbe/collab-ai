import LoginForm  from "@/features/auth/components/login-form";
import { useAuth } from "@/context/auth/authContext";
import { useState } from "react";
import type { Login } from "@/features/auth/types/type";

const LoginScreen = () => {
     const [ loginForm, setLoginForm ] = useState<Login>({
            email:'',
            password:'',
        })
    const {
        handleLogin
    } = useAuth()
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center">
            <section className="w-full md:max-w-md">
                  <LoginForm
                  email={loginForm.email}
                  handleEmail={(val) => setLoginForm((prev) => ({...prev,email:val}))}
                  handlePassword={(val) => setLoginForm((prev) => ({...prev,password:val}))}
                  password={loginForm.password}
                  login={handleLogin}/>
            </section>
        </main>
    )
}
export default LoginScreen;