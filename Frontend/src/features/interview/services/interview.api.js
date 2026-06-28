import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
})


/** 
 * @description Generates an interview report based on the provided job description, self-description, and resume file.
*/
export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) => {
    try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        formData.append('resume', resumeFile);

        const response = await api.post('/api/interview/generate-report', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    }
    catch (error) {
        console.error('Error generating interview report:', error);
    }
}

/**
 * @description Fetches an interview report by its ID.
 */
export const getInterviewReportById = async (reportId) => {
    try {
        const response = await api.get(`/api/interview/report/${reportId}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching interview report:', error);
    }
}

/**
 * @description Fetches all interview reports for the authenticated user.
 */
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get('/api/interview/reports');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching all interview reports:', error);
    }
}