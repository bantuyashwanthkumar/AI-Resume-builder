const userModel = require("../models/user.models")
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
    // check the user is exist or not
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email: email }, { username: username }]
    })
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exist,Please Login" })
    }
    // 
    const hashedpassword = await bcrypt.hash(password, 10)
    // create the user
    const user = await userModel.create({
        username,
        email,
        password: hashedpassword
    })
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    return res.status(201).json({
        message: "User registered successfully",
        user: user,
        token: token
    })
}

async function loginUserController(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
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
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}

module.exports = { registerUserController, loginUserController }