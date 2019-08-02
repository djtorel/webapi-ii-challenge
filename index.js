const express = require('express');
require('dotenv').config();

const postsRoutes = require('./routes/posts');

const server = express();
server.use(express.json());

server.use('/api/posts', postsRoutes);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`API running on port ${port}`));

// mvp complete
