import {z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username too long"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain number"),

  })

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

// type Authentication = {
//     email:string
//     password:string
//     comfirmPassword:string
//     name:string
// }
export type AuthUser = {
    user_id:string | undefined
    email:string | undefined
}
export type Token = {
  access_token:string
  user: AuthUser
}
// export type AuthResponse = {
//   status:number
//   error: string | null 
//   data: Token
// }

export type AuthContextType = {
    user:AuthUser | null,
}