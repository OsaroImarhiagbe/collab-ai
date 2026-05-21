import { LoginForm } from "@/features/auth/components/login-form";

const Login = () => {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center">
            <section className="w-full md:max-w-md">
                  <LoginForm/>
            </section>
        </main>
    )
}
export default Login;