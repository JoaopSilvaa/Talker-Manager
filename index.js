const talkerJson = 'talker.json';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { geraToken, validateEmail, validatePassword } = require('./loginMiddleware');
const {
  validateAge,
  validateName,
  validateTalk, 
  validateRate,
  validateWatchedAt,
} = require('./talkerMiddleware');
const { validateToken } = require('./tokenMiddlware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  if (talker === []) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/search',
  validateToken,
  (req, res) => {
  const { q } = req.query;
  const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  if (!q) return res.status(200).json(talker);
  const filteredName = talker.filter((t) => t.name.includes(q));
  if (!filteredName) return res.status(200).json([]);
  res.status(200).json(filteredName);
});

app.get('/talker/:id', (req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  const { id } = req.params;
  const talkerById = talker.find((talkerId) => talkerId.id === Number(id));
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = geraToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateRate,
  validateWatchedAt,
  (req, res) => {
    const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
    const { name, age, talk } = req.body;
    const id = talker.length + 1;
    talker.push({ id, name, age, talk }); 
    fs.writeFileSync('./talker.json', JSON.stringify(talker));
    res.status(201).json(talker[talker.length - 1]);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  (req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const searchTalkerIndex = talker.findIndex((t) => t.id === Number(id));
  talker[searchTalkerIndex] = { ...talker[searchTalkerIndex], name, age, talk };
  fs.writeFileSync('./talker.json', JSON.stringify(talker));
  res.status(200).json(talker[searchTalkerIndex]);
});

app.delete('/talker/:id',
  validateToken,
  (req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  const { id } = req.params;
  const searchTalkerIndex = talker.findIndex((t) => t.id === Number(id));
  talker.splice(searchTalkerIndex, 1);
  fs.writeFileSync('./talker.json', JSON.stringify(talker));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
