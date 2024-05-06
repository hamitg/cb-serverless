const axios = require('axios');
const cors = require('cors');
const corsHandler = cors({origin: true});

exports.chatWithOpenAI = (req, res) => {
    // Apply CORS middleware and handle preflight requests
    corsHandler(req, res, async () => {
        if (req.method === 'OPTIONS') {
            // Send response to OPTIONS requests
            res.status(200).send();
            return;
        } else if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const chats = req.body.chats;
        if (!chats) {
            return res.status(400).send({ error: 'No message provided' });
        }

        const apiURL = process.env.OPEN_AI_URL;
        const apiKey = process.env.OPENAI_API_KEY;

        try {
            const response = await axios.post(
                apiURL,
                {
                    model: 'gpt-3.5-turbo',
                    messages: chats,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const chatResponse = response.data.choices[0].message.content;
            res.status(200).send({ role: 'assistant', content: chatResponse });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                switch (error.response.status) {
                    case 429:
                        res.status(429).send({ error: 'Rate limit exceeded, please try again later.' });
                        break;
                    case 401:
                        res.status(401).send({ error: 'Unauthorized: Check your API key.' });
                        break;
                    case 500:
                        res.status(500).send({ error: 'Internal Server Error at OpenAI.' });
                        break;
                    default:
                        res.status(500).send({ error: 'An unknown error occurred.' });
                        break;
                }
            } else {
                res.status(500).send({ error: 'An error occurred while connecting to OpenAI.' });
            }
        }
    });
};
