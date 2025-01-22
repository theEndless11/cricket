const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { matchId } = req.query;

  if (!matchId) {
    return res.status(400).json({ error: 'matchId is required' });
  }

  const apiKey = 'Y03c671f8-cc23-454a-9a6e-e04689145c8e';
  const url = `https://cricapi.com/api/cricket?apikey=${apiKey}&matchId=${matchId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Set CORS headers to allow cross-origin requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allow GET and POST methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow Content-Type header

    // Check if CricAPI returns valid match data
    if (data && data.data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No live match data available for this matchId' });
    }
  } catch (error) {
    console.error('Error fetching match data from CricAPI:', error);
    res.status(500).json({ error: 'Error fetching match data from CricAPI' });
  }
};
