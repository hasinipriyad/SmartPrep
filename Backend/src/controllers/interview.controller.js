import generateInterviewReport from '../services/ai.service.js'
import interviewReportModel from '../models/interviewReport.model.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');


/**
 * @route POST /api/interview/generate-report
 * @description Generate an interview report on the basis of user's resume, self description and job description
 * @access private
 */
export async function generateInterviewReportController(req, res) {
  try {
    const parsed = await new pdfParse.PDFParse(Uint8Array.from(req.file.buffer)).getText();
    const resumeText = parsed.text;

    const { selfDescription, jobDescription } = req.body;

    const aiInterviewReport = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...aiInterviewReport,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Failed to generate interview report." });
  }
}

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get the interview report by id
 * @access private
 */
export async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found." });
    }

    res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport,
    });
  }
  catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Failed to fetch interview report." });
  }
}

/**
 * @route GET /api/interview/reports
 * @description Get all interview reports of the user
 * @access private
 */
export async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -__v');

    res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Failed to fetch interview reports." });
  }
}