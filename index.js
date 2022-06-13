const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { geraToken, validateEmail, validatePassword } = require('./loginMiddleware');

const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  if (talker === []) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = talker.find((talkerId) => talkerId.id === Number(id));
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = geraToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
