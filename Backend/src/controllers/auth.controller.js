import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import blackListtokenModel from '../models/blacklist.model.js';

const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    secure: process.env.NODE_ENV === 'production'
};

/**
 * @name registerUserController
 * @description Register a new user, expecting name, email, and password in the request body.
 * @access Public
 */
export async function registerUserController(req,res){
    try{
        const { username, email, password } = req.body;

        // Basic validation
        if(!username || !email || !password){
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{username},{email}]
        })

        if(existingUser){
            return res.status(400).json({ message: "User with this name or email already exists" });
        }

        //Hashing the password before saving to the database using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                id: newUser._id,
                username: newUser.username
            }
            ,process.env.JWT_SECRET,
            {
                expiresIn: '1d' // Token expires in 1 day
            }
        );

        res.cookie('token', token, cookieOptions);

        // Respond with user data and token
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    }
    catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name loginUserController
 * @description Authenticate a user, expecting email and password in the request body.
 * @access Public
 */
export async function loginUserController(req,res){
    try{
        const { email, password } = req.body;

        // Basic validation
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: '1d' // Token expires in 1 day
        });

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }
    catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name logoutUserController
 * @description Log out the user by clearing the authentication cookie.
 * @access Private
 */
export async function logoutUserController(req,res){
    try{
        const token = req.cookies.token;

        if(token){
            // Add the token to the blacklist
            const blacklistedToken = await blackListtokenModel.create({ token });
        }

        // Clear the token cookie
        res.clearCookie('token');

        res.status(200).json({ message: "User logged out successfully" });
    }
    catch(error){
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name getMeController
 * @description Get the profile of the authenticated user.
 * @access Private
 */
export async function getMeController(req,res){
    try{
        const userId = req.user.id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch(error){
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}