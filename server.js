const { OpenAI } = require("openai");  // Correct import for the latest version
const cors = require("cors");
const process = require("process");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

// Initialize OpenAI API with your API key
const openai = new OpenAI({
  apiKey: "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",
});

// Function to generate an image
async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    return response.data[0].url;  // Extracting the URL of the generated image
  } catch (error) {
    console.error(`Error generating image: ${error.message}`);
    return null;
  }
}

app.post('/generate-image', async (req, res) => {
  const data = req.body;
  console.debug("Received data: %s", data);
  const logoDescription = data.logoDescription;

  if (!logoDescription) {
    console.error("No prompt provided");
    return res.status(400).json({ error: "No prompt provided" });
  }

  const imageUrl = await generateImage(logoDescription);
  if (imageUrl) {
    return res.json({ image_url: imageUrl });
  } else {
    return res.status(500).json({ error: "Failed to generate image" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
