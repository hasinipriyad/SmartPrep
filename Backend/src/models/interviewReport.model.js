import mongoose from 'mongoose'

/**
 * Job Description Schema : String
 * Resume text : String
 * Self Description : String
 * 
 * matchScore : Number
 * 
 * Technical Questions - 
 *         [{
 *          question: "",
 *          intention: "",
 *          answer: "" }]
 * Behavioral Questions- 
 * *         [{
 *          question: "",
 *          intention: "",
 *          answer: "" }]
 * Identify skill gaps - [{
 *          skill: "",
 *          severity: {
 *          type: String,
 *          enum: ["low","medium","high"]
 *        }
 * }]
 * Prepartion Schedule - [{
 *          day: Number,
 *          focus: String,
 *          tasks: [String]
 * }]
 * 
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
});

const behavioralQuestionSchema = new mongoose.Schema({
     question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    } 
}, {
    _id: false
});

const skillGaps = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required." ]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
},{
    _id: false
});

const preparationScheduleShema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Tasks are required"]
    }]
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description is required"],
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGaps],
    preparationSchedule: [preparationScheduleShema],
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);

export default interviewReportModel;