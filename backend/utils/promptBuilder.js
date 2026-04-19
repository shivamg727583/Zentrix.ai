export const articlePrompt = (topic) => `
You are a professional SEO content writer.

Write a high-quality article on:
"${topic}"

Structure:
- Engaging introduction
- Proper headings
- Clear explanation
- Conclusion

Tone: Human, engaging, non-robotic
`;

export const blogTitlePrompt = (topic) => `
Generate 5 catchy and SEO-optimized blog titles for:
"${topic}"

Return only titles.
`;

export const resumeReviewPrompt = (text) => `
Act as a senior recruiter.

Analyze this resume:

${text}

Give:
1. Strengths
2. Weaknesses
3. Improvements
4. ATS Score (out of 100)
`;