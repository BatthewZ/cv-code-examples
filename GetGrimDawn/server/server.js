const express = require('express');
const cors = require('cors');
const getGD = require('./GGD2.js');
const path = require('path');
const buildPath = path.join(__dirname, 'build');

const app = express();
const port = 8080;

app.use(cors());
// app.use(express.json());
app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.get('/loadchar', async (req, res) => {
  const charURL = req.query.charURL;

  const urlRequirements = 'https://www.grimtools.com/calc/';
  if (!charURL.includes(urlRequirements) || charURL.length === urlRequirements.length) {
    console.log('There is an error with the URL');
    return res.status(400).send({errMsg: 'Bad URL. Msg was: ' + charURL});
  }

  console.log('URL is:' + charURL);
  const char = await getGD.getGrimDawn(charURL);
  res.status(200).json(char);
});

// This catchall needs to go last
app.get('*', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.listen(port, () => {
  console.log(`Application started and listening on Port ${port}`);
});
