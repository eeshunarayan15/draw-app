import { Request, Response } from "express";
import { CreateUserSchema, SigninSchema, RoomSchema } from "@repo/common";
import { prismaClient } from "@repo/db";
import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    console.log("Received body:", req.body); // Add this line
    const data = CreateUserSchema.safeParse(req.body);
    console.log("Validation result:", data); // This shows success/errors
    const result = CreateUserSchema.safeParse(req.body);
    const userData = result.data;
    const { name, email, password, photo, mobileNumber } = userData!;
    if (!name || name.trim().length < 2) {
      return res
        .status(400)
        .json({ error: "Full name must be at least 2 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    if (!photo || !mobileNumber) {
      return res.status(400).json({
        error: "Photo URL and mobile number are required",
      });
    }
    if (!name || !email || !password || !photo || !mobileNumber) {
      return res.status(400).json({
        error:
          "All fields (fullname, email, password, photo, mobileNumber) are required",
      });
    }
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }
    const existingUser = await prismaClient.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        photo: photo,
        mobileNumber: mobileNumber,
      },
    });

   const token=  generateToken(newUser);

    res.status(201).json({
        message: "Registration successful",
        token,
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            photo: newUser.photo,
            mobileNumber: newUser.mobileNumber,
        },
    });

    //
    //
    //
    //

    // // 4. Check if user already exists
    // const existingUser = await userModel.findOne({email});
    // if (existingUser) {
    //     return res.status(400).json({error: "Email already exists"});
    // }

    // // 5. Hash password
    // const hashedPassword = await bcrypt.hash(password, 12);

    // // 6. Create new user
    // const newUser = await userModel.create({
    //     fullname,
    //     email,
    //     password: hashedPassword,
    // });

    // // 7. Generate JWT token
    // const token = generateToken(newUser);

    // 8. Send response

  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';

    res.status(500).json({
      error: "Server error",
      message: errorMessage
    });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const result = SigninSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }
    const userData = result.data; // Now properly typed and validated


    // // 2. Find user by email
   const existeingUser= await prismaClient.user.findUnique({
      where: { email: userData.email

      },
    })
    // const user = await userModel.findOne({ email });
    if (!existeingUser) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

                        const isPasswordValid=await     bcrypt.compare(userData.password, existeingUser.password);
    //
    // // 3. Compare passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    //
    // // 4. Generate JWT token using utility
    const token = generateToken(existeingUser);
      console.log('🔍 Token before sending response:', token);
      console.log('🔍 Token length before response:', token?.length);
    //
    // // 5. Return token and user (omit password)
    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: existeingUser.id,
            name: existeingUser.name,
            photo:existeingUser.photo,

            email: existeingUser.email,
            mobileNumber:existeingUser.mobileNumber
            // Add other safe public fields if needed (not password)
        },
    });
  } catch (error) {
    // console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};
