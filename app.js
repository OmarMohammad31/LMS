const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const tutoringRoutes = require('./routes/tutoringRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok' })); // health check

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/tutoring-requests', tutoringRoutes);

app.use(errorHandler); // must be last

module.exports = app;
