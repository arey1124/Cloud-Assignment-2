const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 6001;

app.use(express.json());

app.post('/process', async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});