import Course from "../Models/courseModel.js";

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export const searchWithAi = async (req, res) => {
    try {
        const { input } = req.body;
        if (!input) {
            return res.status(400).json({ message: "Search Query is required" })
        }


        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:
        - App Development
        - UI/UX Designing
        - Data Science
        - Data Analytics
        - Ethical Hacking
        - Web Development
        - Artificial Intelligence
        - AI Tools

        Only reply with one single keyword from the list above that best matches the query. Do not explaing anything. No extra text.

        Query: ${input}
        `

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        console.log('AI raw response:', response);
        const keyword = (response && (response.text || response.outputText || response.content || ''))
            ? (response.text || response.outputText || response.content || '')
            : '';
        console.log('Derived keyword from AI:', keyword);
        const courses = await Course.find({
            isPublished: true,
            $or: [
                { title: { $regex: input, $options: 'i' } },
                { subtitle: { $regex: input, $options: 'i' } },
                { description: { $regex: input, $options: 'i' } },
                { category: { $regex: input, $options: 'i' } },
                { level: { $regex: input, $options: 'i' } }
            ]
        });
        if (courses.length>0) {
            return res.status(200).json(courses)
        } else {
            // If no courses found by direct input, try searching using AI-derived keyword
            // Build variants (synonyms) so "Artificial Intelligence" matches category values like "AI/ML"
            const synonymsMap = {
                'artificial intelligence': ['AI', 'AI/ML', 'AI/ML', 'Machine Learning', 'ML', 'AI/ML']
            };
            const mapKey = (keyword || '').toString().trim().toLowerCase();
            const variants = Array.from(new Set([keyword, ...(synonymsMap[mapKey] || [])])).filter(Boolean);

            const orConditions = [];
            ['title', 'subtitle', 'description', 'category', 'level'].forEach((field) => {
                variants.forEach((v) => {
                    orConditions.push({ [field]: { $regex: v, $options: 'i' } });
                });
            });

            const courses = await Course.find({ isPublished: true, $or: orConditions });
            return res.status(200).json(courses)
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to search", error: error.message });
    }
}