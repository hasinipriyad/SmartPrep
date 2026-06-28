import express from 'express'
import * as authController from '../controllers/auth.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register",authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login",authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Clear the user's token from the cookie and blacklist the token
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get the profile of the authenticated user
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authenticateUser,authController.getMeController);


export default authRouter;