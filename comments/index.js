const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    res.status(200).json(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[postId] || [];
    const comment = { id: commentId, content };

    comments.push(comment);
    commentsByPostId[postId] = comments;

    try {
        await axios.post('http://localhost:4000/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId
            }
        });
    } catch (err) {
        console.log(err);
    }

    res.status(201).json(comments);
});

app.listen(PORT, () => {
    console.log(`Comments server running on the port ${PORT}`);
});