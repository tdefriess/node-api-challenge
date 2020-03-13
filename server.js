const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter')

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
    res.send({ message: 'Welcome to my sprint challenge API' });
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl} at ${new Date().toISOString()}`);

    next();
}

module.exports = server;