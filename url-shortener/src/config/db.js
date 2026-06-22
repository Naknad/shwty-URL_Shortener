// src/config/db.js
const urlMap = new Map();           // shortCode → longUrl
const analytics = new Map();        // shortCode → { clicks, lastAccessed }

module.exports = {
  urlMap,
  analytics
};