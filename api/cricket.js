const fetch = require('node-fetch');  // Importing node-fetch to make requests

module.exports = async (req, res) => {
  const { matchId } = req.query;  // Extract the matchId from the query parameters

  if (!matchId) {
    return res.status(400).json({ error: 'matchId is required' });  // If no matchId is provided, send error response
  }

  const apiKey = 'Y03c671f8-cc23-454a-9a6e-e04689145c8e';  // Your CricAPI key
  const url = `https://cricapi.com/api/cricket?apikey=${apiKey}&matchId=${matchId}`;

  try {
    const response = await fetch(url);  // Make the request to CricAPI
    const data = await response.json();  // Parse the JSON response from CricAPI
    
    // Log the data to see the response from CricAPI (for debugging purposes)
    console.log('CricAPI Data:', data);
    
    // Check if CricAPI returns valid match data
    if (data && data.data) {
      res.status(200).json(data);  // Return the match data to the frontend
    } else {
      res.status(404).json({ error: 'No live match data available for this matchId' });  // Handle case where match data is not available
    }
  } catch (error) {
    // Handle error if request to CricAPI fails
    console.error('Error fetching match data from CricAPI:', error);
    res.status(500).json({ error: 'Error fetching match data from CricAPI' });
  }
};
