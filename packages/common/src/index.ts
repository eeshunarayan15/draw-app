import { z } from 'zod';
export const CreateUserSchema=z.object({
    username:z.string().min(3).max(30),
    password:z.string().min(3).max(30),
    email:z.string().min(3).max(30),
    fullname: z.string().min(3).max(30),
    mobileNumber: z.string().min(10)
    

})


export const SigninSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(3).max(30),
});

export const RoomSchema=z.object({
    name: z.string().min(3).max(30),
    // capacity: z.number().min(1).optional(),
    // isAvailable: z.boolean().default(true),
})