// src/controllers/urlController.js
const urlModel = require('../models/urlModel');

const shortenUrl = (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Поле longUrl обязательно' });
  }

  if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
    return res.status(400).json({ error: 'Ссылка должна начинаться с http:// или https://' });
  }

  const shortCode = urlModel.createShortUrl(longUrl);
  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  res.json({
    shortUrl,
    shortCode,
    longUrl
  });
};

const redirectToLongUrl = (req, res) => {
  const { shortCode } = req.params;
  const longUrl = urlModel.getLongUrl(shortCode);

  if (!longUrl) {
    return res.status(404).send('Ссылка не найдена');
  }

  urlModel.incrementClick(shortCode);
  res.redirect(longUrl);
};

const getStats = (req, res) => {
  const { analytics } = require('../config/db');
  res.json(Object.fromEntries(analytics));
};

module.exports = {
  shortenUrl,
  redirectToLongUrl,
  getStats
};