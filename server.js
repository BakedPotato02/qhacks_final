const { OpenAI } = require("openai");  // Correct import for the latest version
const cors = require("cors");
const process = require("process");

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
    process.exit(1); // Exit the process with an error code
  }
}

// Main logic
if (process.argv.length < 3) {
  console.error("Error: No prompt provided");
  process.exit(1);
}

const prompt = process.argv[2];
generateImage(prompt)
  .then((imageUrl) => {
    console.log(imageUrl);  // Output the image URL
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
