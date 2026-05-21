import { SignupForm } from "@/features/auth/components/signup-form";
import { useState } from "react";
import type { Register } from "@/features/auth/types/type";
const Register = () => {
    
    const [ registerForm, setRegiserForm ] = useState<Register>({
            name:'',
            email:'',
            password:'',
        })
    
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center">
            <section className="w-full md:max-w-md">
                    <SignupForm/>
            </section>
        </main>
    );
}

export default Register;