const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/tasks'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/tasks/' }),
);

app.listen(process.env.PORT || 8080);