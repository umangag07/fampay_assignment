const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const videoCronScheduler = require('./utils/fetchYoutubeVideos');
const {
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
} = require('./config/config');
require('dotenv').config();
const videoRouter = require('./routes/videoRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;
const mongoConnectURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;

mongoose
    .connect(mongoConnectURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database successfully');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log('App started on port', port);
});

videoCronScheduler(); // cron schdeuler to fetch videos in background

// Api route
app.use('/api/v1/videos/', videoRouter);

// Dashbaord route
app.use(express.static(path.join(__dirname, 'view')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

module.exports = app;
