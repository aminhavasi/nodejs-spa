const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();

http.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
