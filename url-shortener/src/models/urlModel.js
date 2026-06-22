// src/models/urlModel.js
const { urlMap, analytics } = require('../config/db');
const generateShortCode = require('../utils/generateShortCode');

const createShortUrl = (longUrl) => {
  // Проверяем, есть ли уже такая ссылка
  for (const [code, url] of urlMap.entries()) {
    if (url === longUrl) {
      return code;
    }
  }

  let shortCode;
  do {
    shortCode = generateShortCode(6);
  } while (urlMap.has(shortCode));

  urlMap.set(shortCode, longUrl);
  analytics.set(shortCode, { clicks: 0, lastAccessed: null });

  return shortCode;
};

const getLongUrl = (shortCode) => {
  return urlMap.get(shortCode);
};

const incrementClick = (shortCode) => {
  const stats = analytics.get(shortCode);
  if (stats) {
    stats.clicks += 1;
    stats.lastAccessed = new Date();
  }
};

module.exports = {
  createShortUrl,
  getLongUrl,
  incrementClick
};