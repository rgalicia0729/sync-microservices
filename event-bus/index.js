const express = require('express');
const axios = require('axios');

const PORT = 4000;
const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;

    // axios.post('http://localhost:3000/events', event).catch((err) => { console.error(err) });
    // axios.post('http://localhost:3001/events', event).catch((err) => { console.error(err) });
    axios.post('http://localhost:3002/events', event).catch((err) => { console.error(err) });

    res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Event Bus listening on port ${PORT}`);
});
