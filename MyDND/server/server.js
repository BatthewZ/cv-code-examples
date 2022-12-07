const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./myDb');
const app = express();
const buildPath = path.join(__dirname, 'build');

const port = 8080;
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:' + port],
};

app.use(cors());
app.use(express.json());
app.use(express.static(buildPath));

app.set('port', port);

app.get('/', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.get('*', (req, res) => {
  res.sendFile(buildPath + '/index.html');
});

app.post('/getCollection', async (req, res) => {
  console.log('Collection is: ', req.body.collection);
  const response = await db.getCollection(req.body.collection);
  console.log('Response is: ', response);
  return res.status(200).send(response);
});

app.post('/login', async (req, res) => {
  const user = await db.getUser(req.body.username);
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res.status(400).send({errMsg: 'Username or password was incorrect!'});
  return res.status(200).send({success: true, characters: await db.getCharacters(req.body.username)});
});

app.post('/register', async (req, res) => {
  if (!req.body.adminKey || req.body.adminKey !== 'YourAdminKeyHere')
    return res.status(400).send({errMsg: 'Invalid Admin Key'});

  if (!req.body.username || !req.body.username.trim() || !req.body.password || !req.body.password.trim())
    return res.status(400).send({errMsg: 'Invalid details provided.'});

  if (await db.getUser(req.body.username)) {
    return res.status(400).send({errMsg: 'Username is already taken!'});
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  await db.createItem('users', {username: req.body.username, password: hashedPassword});
  console.log('New user registered: ', req.body.username);
  return res.status(200).send({success: true});
});

app.post('/getCharacters', async (req, res) => {
  return res.status(200).send(await db.getCharacters(req.body.username));
});

app.post('/updateCharacter', async (req, res) => {
  console.log('Updating character...');
  return res
    .status(200)
    .send(await db.updateItem('characters', 'charId', req.body.character.charId, {character: req.body.character}));
});

app.post('/updatePassword', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const update = await db.updateItem('users', 'username', req.body.username, {password: hashedPassword});
  if (update) return res.status(200).send(update);

  res.status(400).send({errMsg: 'Could not update password.'});
});

app.post('/newCharacter', async (req, res) => {
  if (!req.body.charRecord.user) return res.status(400).send({errMsg: 'Invalid user, could not update character'});

  res.status(200).send(await db.createItem('characters', req.body.charRecord));
});

app.post('/deleteCharacter', async (req, res) => {
  if (!req.body.charId) return res.status(400).send({errMsg: 'Could not delete character - Invalid ID.'});
  console.log('Deleting character: ', req.body.charId);
  res.status(200).send(await db.deleteItem('characters', 'charId', req.body.charId));
});

app.listen(port);
console.log('Listening on port: ' + port);
