const userModel = require("../models/user.models")
const blacklistTokenModel = require("../models/blacklist.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
/**
 * @route   POST /api/auth/register
 * @description  Register a new user
 * @requestbody  {username: "", email: "", password: ""}
 * @response     {"message": "User registered successfully"} 
 * @access       Public 
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All the Fields are required" })
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" });
    }
    // check the user is exist or not
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email: email }, { username: username }]
    })
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exist,Please Login" })
    }
    // create the user
    let user;
    try {
        user = await userModel.create({
            username,
            email,
            password: password // Pass the plain password, Mongoose will validate and then hash it
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    });
}

async function loginUserController(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}

async function logoutUserController(req, res){
    const token = req.cookies.token;

    if (token){
        await blacklistTokenModel.create({ token});
    }

    res.clearCookie("token");
    res.status(200).json({ 
        message: "User logged out successfully" 
    });  

}

async function getMeController(req, res){
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { registerUserController,
                   loginUserController,
                   logoutUserController,
                   getMeController }