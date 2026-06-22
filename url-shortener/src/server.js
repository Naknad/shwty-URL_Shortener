// src/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet(
{
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(express.json());

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => 
{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', urlRoutes);

app.listen(PORT, () => 
{
  console.log(`shwty сервер запущен: http://localhost:${PORT}`);
  console.log(`BASE_URL = ${process.env.BASE_URL}`);
});