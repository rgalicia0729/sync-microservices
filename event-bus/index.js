const express = require('express');
const axios = require('axios');

const PORT = 4000;
const app = express();

app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://comments-srv:3001/events', event).catch((err) => { console.error(err) });
    axios.post('http://query-srv:3002/events', event).catch((err) => { console.error(err) });
    axios.post('http://moderation-srv:3003/events', event).catch((err) => { console.error(err) });

    res.status(200).json({ status: 'OK' });
});

app.get('/events', (_, res) => {
    res.status(200).json(events);
});

app.listen(PORT, () => {
    console.log(`Event Bus listening on port ${PORT}`);
});
