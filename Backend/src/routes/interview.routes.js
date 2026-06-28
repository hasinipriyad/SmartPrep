import {Router} from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as interviewController from '../controllers/interview.controller.js';
import upload from '../middlewares/file.middleware.js'

const interviewRouter = Router();


/**
 * @route POST /api/interview/generate-report
 * @description Generate an interview report on the basis of user's resume, self description and job description
 * @access private
 */

interviewRouter.post("/generate-report", authMiddleware.authenticateUser, upload.single("resume"), interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get the interview report by id
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authenticateUser, interviewController.getInterviewReportByIdController);

/**
 * @route GET /api/interview/reports
 * @description Get all interview reports of the user
 * @access private
 */
interviewRouter.get("/reports", authMiddleware.authenticateUser, interviewController.getAllInterviewReportsController);

export default interviewRouter;