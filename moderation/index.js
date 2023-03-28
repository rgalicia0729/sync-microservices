const express = require('express');
const axios = require('axios');

const PORT = 3003;
const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.toLowerCase().includes('orange') ? 'rejected' : 'approved';

        try {
            await axios.post('http://localhost:4000/events', {
                type: 'CommentModerated',
                data: {
                    id: data.id,
                    content: data.content,
                    status,
                    postId: data.postId
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Moderation service listening on port ${PORT}`);
});