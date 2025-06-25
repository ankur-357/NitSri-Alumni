// backend/routes/chat.js
const express = require('express');
const router = express.Router();

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// POST /api/chat/gemini
router.post('/gemini', async (req, res) => {
    try {
        const { message, conversationHistory } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        // System prompt for context
        const systemPrompt = "You are a helpful AI assistant for an alumni website. Be professional, friendly, and concise in your responses. Help users with questions about alumni services, career guidance, networking, and general inquiries.";

        // Prepare conversation context
        let conversationContext = systemPrompt + '\n\n';
        if (conversationHistory && conversationHistory.length > 0) {
            // Only include recent conversation history (last 10 messages to manage token usage)
            const recentHistory = conversationHistory.slice(-10);
            conversationContext += recentHistory
                .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
                .join('\n');
            conversationContext += '\n';
        }

        // Create the full prompt with context
        const fullPrompt = conversationContext + `User: ${message.trim()}\nAssistant:`;

        // Prepare the request payload for Gemini API
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: fullPrompt
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.8,
                maxOutputTokens: 2048,
                stopSequences: []
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        // Make request to Gemini API
        const apiResponse = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            timeout: 30000 // 30 second timeout
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json().catch(() => ({}));
            console.error('Gemini API Error:', apiResponse.status, errorData);

            if (apiResponse.status === 401) {
                return res.status(401).json({ error: 'Invalid API key' });
            }
            if (apiResponse.status === 429) {
                return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
            }
            if (apiResponse.status === 400) {
                return res.status(400).json({ error: 'Invalid request format or content filtered' });
            }

            throw new Error(`API request failed with status ${apiResponse.status}`);
        }

        const data = await apiResponse.json();

        // Extract the response text
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response candidates received from API');
        }

        const candidate = data.candidates[0];
        if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
            throw new Error('Invalid response structure from API');
        }

        const responseText = candidate.content.parts[0].text;

        // Basic content filtering
        if (!responseText || responseText.trim().length === 0) {
            throw new Error('Empty response from AI model');
        }

        res.json({
            response: responseText.trim(),
            timestamp: new Date().toISOString(),
            model: "gemini-2.0-flash"
        });

    } catch (error) {
        console.error('Gemini API Error:', error);

        // Handle specific error types
        if (error.message.includes('API key') || error.message.includes('401')) {
            return res.status(401).json({ error: 'Invalid or missing API key' });
        }

        if (error.message.includes('quota') || error.message.includes('429')) {
            return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
        }

        if (error.message.includes('timeout') || error.name === 'AbortError') {
            return res.status(408).json({ error: 'Request timeout. Please try again.' });
        }

        if (error.message.includes('SAFETY') || error.message.includes('filtered')) {
            return res.status(400).json({ error: 'Content filtered for safety reasons. Please rephrase your message.' });
        }

        res.status(500).json({
            error: 'Failed to generate response',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// GET /api/chat/status - Health check endpoint
router.get('/status', (req, res) => {
    res.json({
        status: 'online',
        service: 'Gemini Chat API',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
