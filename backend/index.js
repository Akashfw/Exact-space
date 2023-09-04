const express = require('express');
const bodyParser = require('body-parser');
const cors= require("cors");
require("dotenv").config();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON in request body

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.get("/",(req,res)=>{
    res.send("home page")
})


const checkJsonMiddleware = (req, res, next) => {
    try {
        JSON.parse(req.body);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON input' });
    }
};

// Define a route to handle POST requests
app.post('/process-json', (req, res) => {
    try {
        // Check if the request body contains valid JSON
        const inputData =req.body;
        // Return the JSON value as response
        return res.status(200).json(inputData);
    } catch (error) {
        console.error('Error processing JSON:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
