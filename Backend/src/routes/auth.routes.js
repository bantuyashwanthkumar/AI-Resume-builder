const { Router } = require("express");
const authcontroller = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");
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

/**
 * @route   GET /api/auth/logout
 * @description  Logout a user
 * @requestbody  {}
 * @response     {"message": "User logged out successfully"} 
 * @access       Private 
 */
authRouter.post("/logout", authcontroller.logoutUserController);


/**
 * @route Get /api/auth/get-me
 * @description Get the current logged in user details
 * @access Private
 * @response {id: "", username: "", email: ""}
 */

authRouter.get("/Get-me", authUser, authcontroller.getMeController);
