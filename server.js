const express = require('express');
const fs = require('fs');
const app = express();
const port = 30031;

let storedText = "Initial text";

// Function to read and write to a file to persist the text.
const filePath = 'storedText.txt';

// Check if the file exists and load the stored text from the file.
if (fs.existsSync(filePath)) {
    storedText = fs.readFileSync(filePath, 'utf8');
}

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route to display the stored text (both normal and curl requests)
app.get('/', (req, res) => {
    res.send(storedText);
});

// Special URL to update the text (e.g., /stored-text=new-text)
app.get('/stored-text=:newText', (req, res) => {
    storedText = req.params.newText;
    
    // Save the updated text to the file to persist it.
    fs.writeFileSync(filePath, storedText, 'utf8');

    res.send(`Text updated to: ${storedText}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
