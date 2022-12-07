const express = require('express');
const path = require('path');
const {PORT = 3000} = process.env;

const app = express();

// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 8080;

// app.set('port',port);

// Serve static files:
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.get('*', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.listen(PORT);
console.log('Listening on port: ' + PORT);
