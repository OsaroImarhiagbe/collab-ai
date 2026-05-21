import { SignupForm } from "@/features/auth/components/signup-form";
const Register = () => {

    return (
        <main className="flex min-h-dvh flex-col items-center justify-center">
            <section className="w-full md:max-w-md">
                    <SignupForm/>
            </section>
        </main>
    );
}

export default Register;