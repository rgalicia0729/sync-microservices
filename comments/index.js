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
    const status = 'pending';

    const comments = commentsByPostId[postId] || [];
    const comment = { id: commentId, content, status };

    comments.push(comment);
    commentsByPostId[postId] = comments;

    try {
        await axios.post('http://localhost:4000/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                status,
                postId
            }
        });
    } catch (err) {
        console.log(err);
    }

    res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, status, postId } = data;

        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => comment.id === id);

        comment.status = status;

        try {
            await axios.post('http://localhost:4000/events', {
                type: 'CommentUpdated',
                data
            });
        } catch (err) {
            console.error(err);
        }
    }

    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Comments server running on the port ${PORT}`);
});