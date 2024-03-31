import bcrypt from "bcryptjs"
import User from '../models/user.model.js';
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "password dont match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "username already exsit" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar,iran.liara.run/public/boy?username=${username}`
        const grilProfilePic = `https://avatar,iran.liara.run/public/boy?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : grilProfilePic

        });
        if (newUser) {
            // res返回cookie 给前端
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "invalid user data" });
        }

    } catch (error) {
        console.log('%cerror backend\controllers\auth.controller.js line:31 ', 'color: red; display: block; width: 100%;', error.message);
        res.status(500).json({ error: "internal server error" });
    };
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('%cpassword\controllers\auth.controller.js:49 object', 'color: #007acc;', password);
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || isPasswordCorrect) {
            return res.status(400).json({ error: "invalid username or password wrong " });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log('%cerror backend\controllers\auth.controller.js line:31 ', 'color: red; display: block; width: 100%;', error.message);
        res.status(500).json({ error: "internal server error" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log('%cerror backend\controllers\auth.controller.js line:31 ', 'color: red; display: block; width: 100%;', error.message);
        res.status(500).json({ error: "internal server error" });
    }
}