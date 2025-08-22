import { Request, Response } from "express";
import {CreateUserSchema,SigninSchema, RoomSchema} from "@repo/common";


export const register = async (req: Request, res: Response) => {


    try {
       const data=CreateUserSchema.safeParse(req.body);
       if(!data){
        return    res.status(400).json({
               message:"Invalid credentials"
           })

       }
        // if (!fullname || !email || !password) {
        //     return res.status(400).json({
        //         error: "All fields (fullname, email, password) are required",
        //     });
        // }
        //
        // if (!fullname || fullname.trim().length < 2) {
        //     return res
        //         .status(400)
        //         .json({error: "Full name must be at least 2 characters long"});
        // }
        //
        //
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!email || !emailRegex.test(email)) {
        //     return res.status(400).json({error: "Invalid email format"});
        // }

        // 3. Validate password
        // if (!password || password.length < 6) {
        //     return res
        //         .status(400)
        //         .json({error: "Password must be at least 6 characters long"});
        // }

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
        // res.status(201).json({
        //     message: "Registration successful",
        //     token,
        //     user: {
        //         id: newUser._id,
        //         email: newUser.email,
        //         fullname: newUser.fullname,
        //     },
        // });
    } catch (e) {
        // console.error("Error in user registration:", e.message);
        res.status(500).json({error: "Server error"});
    }
}


export const LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // 1. Input validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // // 2. Find user by email
        // const user = await userModel.findOne({ email });
        // if (!user) {
        //     return res.status(401).json({ error: "Invalid email or password" });
        // }
        //
        // // 3. Compare passwords
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ error: "Invalid email or password" });
        // }
        //
        // // 4. Generate JWT token using utility
        // const token = generateToken(user);
        //
        // // 5. Return token and user (omit password)
        // res.status(200).json({
        //     message: "Login successful",
        //     token,
        //     user: {
        //         id: user._id,
        //         fullname: user.fullname,
        //         email: user.email,
        //         // Add other safe public fields if needed (not password)
        //     },
        // });
    } catch (error) {
        // console.error("Login error:", error.message);
        res.status(500).json({ error: "Login failed. Please try again later." });
    }
};