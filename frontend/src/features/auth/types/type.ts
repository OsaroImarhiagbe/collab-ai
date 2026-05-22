type Authentication = {
    email:string
    password:string
    comfirmPassword:string
    name:string
}
export type AuthUser = {
    user_id:string | undefined
    authenticated:false | undefined
}
export type AuthResponse = {
    access_token:string
    user:AuthUser
}




export type Login = Pick<Authentication, "email" | "password">

export type RegisterType = Pick<Authentication, "email" | "password" | 'name'>

export type AuthContextType = {
    authenticated:AuthUser
    handleLogin: (email:string,password:string) => void
    handleRegister: (name:string,email:string,password:string) => void
}