const express = require('express');
const { randomBytes } = require('crypto');

const PORT = 3000;
const app = express();
app.use(express.json());

const posts = {};

app.get('/posts', (_, res) => {
    res.status(200).json(posts);
});

app.post('/posts', (req, res) => {
    const { title } = req.body;

    const id = randomBytes(4).toString('hex');
    posts[id] = { id, title };

    res.status(201).json(posts[id]);
});

app.listen(PORT, () => {
    console.log(`Posts server runing on the port ${PORT}`);
});
