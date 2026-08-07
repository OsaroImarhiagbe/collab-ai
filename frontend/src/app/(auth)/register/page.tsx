'use client'
// import  SignupForm  from "@/features/auth/components/signup-form";
// import { useState, useCallback } from "react";
// import {type RegisterSchema } from "@/features/auth/types/type";
// import { useRegister } from "@/features/auth/hooks/useAuth";
const Register = () => {
    
    // const [ registerForm, setRegisterForm ] = useState<RegisterSchema>({
    //         name:'',
    //         email:'',
    //         password:'',
    //         confirmPassword:''
    //     })
    // const { mutateAsync:register, isPending} = useRegister()

    // const handleSubmit = useCallback(async (e: React.SubmitEvent) => {
    //     e.preventDefault()
    //     await register({ email:registerForm.email, password:registerForm.password,name:registerForm.name });
    //     },[registerForm.email,registerForm.name, registerForm.password,register]);
    
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center bg-red-400">
            <p>register</p>
            {/* <section className="w-full md:max-w-md">
                    <SignupForm
                    name={registerForm.name}
                    email={registerForm.email}
                    password={registerForm.password}
                    handleEmail={(val:string) => setRegisterForm((prev) => ({...prev, email:val}))}
                    handlePassword={(val:string) => setRegisterForm((prev) => ({...prev, password:val}))}
                    handleName={(val:string) => setRegisterForm((prev) => ({...prev, name:val}))}
                    loading={isPending}
                    register={handleSubmit}
                    />
            </section> */}
        </main>
    );
}

export default Register;