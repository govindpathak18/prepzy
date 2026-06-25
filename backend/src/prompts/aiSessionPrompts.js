export const buildSessionNamePrompt = ({ selfDescription, jobDescription }) => `
Return a short JSON object for this job application session:
{"sessionName":"Role at Company","jobRole":"Role","company":"Company or empty string","skills":["skill"]}

Rules:
- Return only JSON.
- If company is not clear, use an empty string.
- sessionName must be concise.

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}`;

export const buildQuestionPrompt = ({ session, count = 10 }) => `
You are Prepzy's AI interview question generator.

Use the session data to generate JSON:
{
  "title": "string",
  "questions": [
    {"type":"technical|behavioral|hr|system-design|coding|other","difficulty":"easy|medium|hard","question":"string","answerGuide":"string","followUps":["string"]}
  ]
}

Rules:
- Return only JSON.
- Generate ${count} questions.
- Use the job description, resume text, skills, experience, and self description.
- Include technical and behavioral coverage.

SESSION:
${JSON.stringify(session, null, 2)}`;

export const buildResumeAnalysisPrompt = ({ session }) => `
You are Prepzy's resume reviewer.

Analyze the resume against the job description and return JSON:
{
  "resumeScore": number,
  "atsScore": number,
  "missingKeywords": ["string"],
  "suggestions": ["string"],
  "improvements": ["string"],
  "summary": "string"
}

Rules:
- Return only JSON.
- Scores must be 0 to 100.
- Suggestions should be specific and actionable.

SESSION:
${JSON.stringify(session, null, 2)}`;

export const buildAtsResumePrompt = ({ session }) => `
You are Prepzy's ATS resume optimization assistant.

Generate an ATS-optimized resume as clean HTML.

Rules:
- Return only HTML.
- No markdown, no explanations, no script tags, and no inline event handlers.
- Use semantic HTML with a small <style> block.
- Keep it printable and professional.
- Tailor it to the job description while staying truthful to the resume and self description.
- Include sections: Header, Summary, Skills, Experience, Projects, Education.

SESSION:
${JSON.stringify(session, null, 2)}`;

export const buildInterviewPrompt = ({ session, questionCount = 8 }) => `
You are Prepzy's mock interview engine.

Generate a mock interview as JSON:
{
  "questions": [
    {"type":"technical|behavioral|hr|system-design|coding|other","difficulty":"easy|medium|hard","question":"string","expectedAnswer":"string","followUps":["string"]}
  ]
}

Rules:
- Return only JSON.
- Generate ${questionCount} questions.
- Questions must be based on this exact session.
- Include coding and discussion questions where relevant.

SESSION:
${JSON.stringify(session, null, 2)}`;

export const buildAnswerEvaluationPrompt = ({ question, answer }) => `
Evaluate this interview answer as JSON:
{"score": number, "feedback": "string"}

Rules:
- Return only JSON.
- Score must be 0 to 100.
- Feedback must be concise and actionable.

QUESTION:
${question}

ANSWER:
${answer}`;

export const buildInterviewReportPrompt = ({ interview }) => `
Create a final interview evaluation report as JSON:
{
  "overallScore": number,
  "strengths": ["string"],
  "improvements": ["string"],
  "summary": "string"
}

Rules:
- Return only JSON.
- overallScore must be 0 to 100.

INTERVIEW:
${JSON.stringify(interview, null, 2)}`;
