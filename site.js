const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Import CORS module
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.post('/path/to/site.js', (req, res) => {
    const { logoDescription } = req.body;

    fs.writeFile('prompt.txt', logoDescription, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
            return;
        }
        console.log('File has been written successfully!');
        res.status(200).send('File has been written successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Define the prompts
const purpose = ""
const border = ""
const color1 = ""
const color2 = ""
const text = ""
const artstyle = ""
const mascot = ""

// Test variable for Prompt (DO DELETE THIS FOR FINAL PRODUCT and replace the file)

const logoDescription = "Create a logo for ".concat(
    purpose,
    " with the border of the logo being ",
    border,
    ". The hex value for the primary color is ",
    color1,
    " the hex value for the secondary color is ",
    color2,
    ". The text that surrounds the logo the user wants to be implemented in the logo is: ",
    text,
    ". The artstyle of the logo is ",
    artstyle,
    " and the mascot should be within the borders of the logo. The mascot is ",
    mascot,
    "."
);

// Write to 'prompt.txt'

fs.writeFile('prompt', logoDescription, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
        console.log('File has been written successfully!');
    });
