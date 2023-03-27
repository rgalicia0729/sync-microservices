const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (_, res) => {
    res.status(200).json(posts);
});

app.post('/posts', async (req, res) => {
    const { title } = req.body;

    const id = randomBytes(4).toString('hex');
    posts[id] = { id, title };

    try {
        await axios.post('http://localhost:4000/events', {
            type: 'PostCreated',
            data: { id, title }
        });
    } catch (err) {
        console.error(err);
    }

    res.status(201).json(posts[id]);
});

app.listen(PORT, () => {
    console.log(`Posts server running on the port ${PORT}`);
});
