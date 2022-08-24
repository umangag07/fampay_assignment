const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('App started on port', port);
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'successfull' });
});
