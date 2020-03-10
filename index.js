const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const helmet = require('helmet');

app.use(helmet());

http.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
