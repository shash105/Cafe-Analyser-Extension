const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({limit: "5mb"}));

app.post("/analyse", async (req, res) => {

    try{
        const {reviews} = req.body;

        if(!reviews || !Array.isArray(reviews)){
            return res.status(400).json({
                error: "Reviews must be an array"
            });
        }
        
        console.log(`received ${reviews.length} reviews`);

        const prompt = `
        You are analysing reviews of a cafe to determine whether it is a good place to work.
        
        Read the customer reviews below.
        
        Look specifically for evidence about:
        1. WiFi / internet
        2. Power sockets / charging
        3. Laptop friendliness / ability to work
        4. Quietness
        5. Noise
        6. Seating suitable for working 

        IMPORTANT:
        - Only count something as a mention if the review actually provides evidence.
        - Do not assume that a cafe has WiFi just because it is a cafe.
        - Do not assume that power sockets exist unless a review mentions them.
        - Distinguish positive and negative comments.
        - If there is no evidence, return 0.
        - Base the scores on the reviews, not general knowledge.

        Give each category a score from 0 to 5:

        0 = no evidence
        1 = very poor / mostly negative
        2 = somewhat poor
        3 = average / mixed
        4 = good
        5 = very good / strongly positive

        Return JSON only. 

        Reviews:

        ${reviews.map((review, index) => `REVIEW ${index + 1}:
        ${review}`).join("\n\n")}
        `;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ], 

                    generationConfig: {
                        responseMimeType: "application/json",

                        responseSchema: {
                            type: "object",
                            properties: {

                                wifi: {
                                    type: "object",
                                    properties: {
                                        score : { type: "integer"},
                                        mentions: { type: "integer"}
                                    },
                                    required: ["score", "mentions"]
                                }, 
                                
                                power: {
                                    type: "object",
                                    properties: {
                                        score : { type: "integer"},
                                        mentions: { type: "integer"}
                                    },
                                    required: ["score", "mentions"]
                                },

                                laptopFriendly: {
                                    type: "object",
                                    properties: {
                                        score : { type: "integer"},
                                        mentions: { type: "integer"}
                                    },
                                    required: ["score", "mentions"]
                                },
                                quiet: {
                                    type: "object",
                                    properties: {
                                        score : { type: "integer"},
                                        mentions: { type: "integer"}
                                    },
                                    required: ["score", "mentions"]
                                },

                                noisy: {
                                    type: "object",
                                    properties: {
                                        score : { type: "integer"},
                                        mentions: { type: "integer"}
                                    },
                                    required: ["score", "mentions"]
                                },

                                overall: {
                                    type: "string"
                                }
                            },
                                required: [
                                    "wifi",
                                    "power",
                                    "laptopFriendly",
                                    "quiet",
                                    "noisy",
                                    "overall"
                                ]
                        }
                    }
                })     
                }
            );

            const data = await response.json();

            if(!response.ok) {
                console.error(data);

                return res.status(500).json({
                    error: "Gemini API request failed"
                });
            }

            const result = JSON.parse(
                data.candidates[0].content.parts[0].text
            );

            console.log("AI analysis complete");

            res.json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }

});

app.listen(3000, () => {
    console.log("Cafe Analyser server running on http://localhost:3000");
});


