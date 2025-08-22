import { z } from "zod";

// User Registration Schema - Matches your Prisma User model exactly
export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),

  password: z.string().min(6, "Password must be at least 6 characters long"),

  name: z.string().min(2, "Name must be at least 2 characters long").trim(),

  photo: z.string().min(1, "Photo URL is required"),

  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
});

// User Sign In Schema
export const SigninSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),

  password: z.string().min(1, "Password is required"),
});

// Room Creation Schema - Matches your Prisma Room model
export const RoomSchema = z.object({
  slug: z
    .string()
    .min(3, "Room slug must be at least 3 characters")
    .max(50, "Room slug too long"),

  adminId: z.string().uuid("Invalid admin ID format"),
});

// Chat Message Schema - Matches your Prisma Chat model
export const ChatSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message too long"),

  roomId: z
    .number()
    .int("Room ID must be an integer")
    .positive("Room ID must be positive"),

  userId: z.string().uuid("Invalid user ID format"),
});
