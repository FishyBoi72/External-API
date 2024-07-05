const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors'); // Import cors module

const app = express();
const port = 3000;

// CORS options
const corsOptions = {
    origin: '*', // Allow requests from any origin
    credentials: true, // Allow sending cookies from client
    optionsSuccessStatus: 200 // Return status 200 for preflight requests
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to fetch cat images based on HTTP status code
app.get('/http-cat/:statusCode', async (req, res) => {
    const { statusCode } = req.params;
    const url = `https://http.cat/${statusCode}`;

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        if (response.status === 404) {
            throw new Error('HTTP Cat image not found');
        }
        const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
        const imageSrc = `data:image/png;base64,${imageBase64}`;
        res.json({ imageSrc });
    } catch (error) {
        console.error('Error fetching HTTP Cat image:', error.message);
        res.status(404).json({ error: 'That code doesn\'t exist!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
