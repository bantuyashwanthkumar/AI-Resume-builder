const { Router } = require("express");
const authcontroller = require("../controllers/auth.controller");

const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @description  Register a new user
 * @requestbody  {username: "", email: "", password: ""}
 * @response     {"message": "User registered successfully"} 
 * @access       Public 
 */
authRouter.post("/register", authcontroller.registerUserController);

/**
 * @route   POST /api/auth/login
 * @description  Login a user
 * @requestbody  {email: "", password: ""}
 * @response     {"message": "User logged in successfully"} 
 * @access       Public 
 */
authRouter.post("/login", authcontroller.loginUserController);


module.exports = authRouter;