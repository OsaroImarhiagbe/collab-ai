import  SignupForm  from "@/features/auth/components/signup-form";
import { useState } from "react";
import { useAuth } from "@/context/auth/authContext";
import type { RegisterType } from "@/features/auth/types/type";
const Register = () => {
    
    const [ registerForm, setRegisterForm ] = useState<RegisterType>({
            name:'',
            email:'',
            password:'',
        })
    
    const { handleRegister } = useAuth()
    
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center">
            <section className="w-full md:max-w-md">
                    <SignupForm
                    name={registerForm.name}
                    email={registerForm.email}
                    password={registerForm.password}
                    handleEmail={(val:string) => setRegisterForm((prev) => ({...prev, email:val}))}
                    handlePassword={(val:string) => setRegisterForm((prev) => ({...prev, password:val}))}
                    handleName={(val:string) => setRegisterForm((prev) => ({...prev, name:val}))}
                    register={handleRegister}
                    />
            </section>
        </main>
    );
}

export default Register;