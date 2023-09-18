
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors'); 


app.use(express.json());


app.use(cors());


const favorites = [];


app.post('/api/favorites', (req, res) => {
  console.log('Received POST request to /api/favorites');
  const favorite = req.body;
  favorites.push(favorite);
  res.json(favorite);
});

// Remove a favorite movie by IMDb ID
app.delete('/api/favorites/:imdbID', (req, res) => {
  const imdbID = req.params.imdbID;
  const index = favorites.findIndex((favorite) => favorite.imdbID === imdbID);

  if (index !== -1) {
    favorites.splice(index, 1);
    res.status(200).json({ message: 'Movie removed from favorites' });
  } else {
    res.status(404).json({ message: 'Movie not found in favorites' });
  }
});

// Retrieve all favorites
app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
