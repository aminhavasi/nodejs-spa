const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const helmet = require('helmet');
const mongoose = require('mongoose');

app.use(helmet());

mongoose.connect(process.env.URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(require('./src/routes/user'));
http.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
