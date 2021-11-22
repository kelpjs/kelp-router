const http = require('http');
const kelp = require('kelp');
const { get } = require('..');

const app = kelp();

app.use(get('/', (req, res, next) => {
    
}));