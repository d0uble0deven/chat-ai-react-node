const express = require("express");
const router = express.Router();

const { OpenAI } = require("openai");

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

async function getCompletion(prompt) {
  prompt = Object.values(prompt)[0];
  console.log("Prompt:", prompt);
  // add prompt to DB
  try {
    const response = await perplexity.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [{ role: "user", content: prompt }],
      stream: false,
    });
    console.log("response: ", response);
    console.log("content: ", response.choices[0].message.content);
    // add response.choices[0].message.content to DB
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error querying Perplexity API:", error);
    // add error message to DB
    return null;
  }
}

// Define a route
router.post("/", (req, res) => {
  getCompletion(req.body).then((response) => {
    res.send(response);
  });
});

router.get("/101", (req, res) => {
  res.send("<h3>This is a Perplexity 101 route!</h3>");
});

router.get("/102", (req, res) => {
  res.send("<h3>This is a Perplexity 102 route!</h3>");
});

module.exports = router;
