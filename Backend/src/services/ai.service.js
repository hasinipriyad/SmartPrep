import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Native SDK Schema Definition
const interviewReportSchema = {
  type: "OBJECT",
  properties: {
    matchScore: {
      type: "INTEGER",
      description: "How well the resume and self-description match the job description, from 0 to 100"
    },
    technicalQuestions: {
      type: "ARRAY",
      description: "Technical questions that can be asked in the interview along with their intention and answer",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING", description: "The technical question that can be asked in the interview" },
          intention: { type: "STRING", description: "The intention of the interviewer behind asking this question" },
          answer: { type: "STRING", description: "How to answer this question, what points to cover, what approach to take etc." }
        },
        required: ["question", "intention", "answer"]
      }
    },
    behavioralQuestions: {
      type: "ARRAY",
      description: "Behavioral questions that can be asked in the interview along with their intention and answer",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING", description: "The behavioral question that can be asked in the interview" },
          intention: { type: "STRING", description: "The intention of the interviewer behind asking this question" },
          answer: { type: "STRING", description: "How to answer this question, what points to cover, what approach to take etc." }
        },
        required: ["question", "intention", "answer"]
      }
    },
    skillGaps: {
      type: "ARRAY",
      description: "Skills the candidate is missing relative to the job description, with severity",
      items: {
        type: "OBJECT",
        properties: {
          skill: { type: "STRING", description: "The skill the candidate is lacking" },
          severity: { 
            type: "STRING", 
            enum: ["low", "medium", "high"], 
            description: "The severity of the skill gap" 
          }
        },
        required: ["skill", "severity"]
      }
    },
    preparationSchedule: {
      type: "ARRAY",
      description: "A day-by-day preparation schedule leading up to the interview",
      items: {
        type: "OBJECT",
        properties: {
          day: { type: "INTEGER", description: "The day number in the preparation schedule" },
          focus: { type: "STRING", description: "The main focus or theme for this day" },
          tasks: { 
            type: "ARRAY", 
            items: { type: "STRING" }, 
            description: "The specific tasks to complete on this day" 
          }
        },
        required: ["day", "focus", "tasks"]
      }
    },
    title: {
      type: "STRING",
      description: "The title of the job for which the interview report is generated"
    }
  },
  required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationSchedule", "title"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert technical interview coach and hiring analyst. Given a job description, a candidate's resume, and the candidate's self-description, produce a structured interview preparation report.

    Be honest and calibrated with matchScore (0-100): a strong match scores high, a weak or mismatched candidate scores low. Do not inflate scores.
    
    Every question, skill gap, and preparation task must trace back to the specific job description and the candidate's actual background. Do not produce generic advice. Prioritize closing the highest-severity skill gaps first in the preparation schedule.
    
    Candidate Details: 
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: interviewReportSchema, 
            }
        });

        if (response.text) {
            const parsedData = JSON.parse(response.text);
            return parsedData;
        } else {
            console.error("No text returned in the response.");
            return null;
        }
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
}

export default generateInterviewReport;