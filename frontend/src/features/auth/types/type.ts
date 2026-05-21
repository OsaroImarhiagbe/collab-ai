

export type AuthResponse = {
    access_token:string
}



type Authentication = {
    email:string
    password:string
    comfirmPassword:string
    name:string
}

export type Login = Pick<Authentication, "email" | "password">

export type Register = Pick<Authentication, "email" | "password" | 'name'>

export type AuthContextType = {
    handleLogin: (email:string,password:string) => void
    handleRegister: (name:string,email:string,password:string) => void
}