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

// Route to fetch top tracks from Shazam API
app.get('/top-tracks', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/charts/track',
        params: {
            locale: 'en-US',
            pageSize: '20',
            startFrom: '0'
        },
        headers: {
            'x-rapidapi-key': '7411822642mshffd982216479018p1dd3f1jsn64703637bb8d',
            'x-rapidapi-host': 'shazam.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
