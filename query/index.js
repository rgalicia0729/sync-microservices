const express = require('express');
const cors = require('cors');

const PORT = 3002;
const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (_, res) => {
    res.status(200).json(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }

    res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Query service listening on port ${PORT}`);
});