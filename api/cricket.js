// api/cricket.js
const fetch = require('node-fetch');

const API_KEY = 'Y03c671f8-cc23-454a-9a6e-e04689145c8e'; // Your CricAPI key

module.exports = async (req, res) => {
  const { matchId } = req.query;  // Get the matchId from the query parameters
  if (!matchId) {
    return res.status(400).json({ error: 'matchId is required' });
  }

  try {
    const response = await fetch(`https://cricapi.com/api/cricket?apikey=${API_KEY}&matchId=${matchId}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from CricAPI' });
  }
};
