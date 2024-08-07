import UserModel from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createtoken = async (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name ||!email ||!password) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }

    try {
        const exist = await UserModel.findOne({ email });

        if (exist) {
            return res.status(400).json({ message: 'Email already exists', success: false });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email', success: false });
        }
        if (!password || password.length < 4) {
            return res.status(400).json({ message: 'Password should be at least 4 characters long', success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ name, email, password: hashedPassword });

        const user = await newUser.save();
        const token = await createtoken(user._id);

        console.log(`User ${user.name} registered successfully. Token: ${token}`);

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            token: token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email ||!password) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password', success: false });
        }

        const token = await createtoken(user._id);
        console.log(`User ${user.name} logged in successfully. Token: ${token}`);

        return res.status(200).json({ success: true, message: "User logged in", token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};



const getUserProfile = async (req, res) => {

    console.log('User from token:', req.user);
    const user = req.user; // directly assign user from req.user

    try {

        if (!user || !user._id) {
            return res.status(400).json({ message: 'Invalid user', success: false });
        }

        const userProfile = await UserModel.findOne({ _id: user._id });

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user: userProfile
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error', success: false });
    }
};


export {
    registerUser,
    loginUser,
    getUserProfile
};
