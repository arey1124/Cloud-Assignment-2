const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 6000;

app.use(express.json());

app.post('/calculate', async (req, res) => {
  try {
    const { file, product } = req.body;

    // Validate input JSON
    if (!file) {
      return res.status(400).json({
            file: null,
            error: "Invalid JSON input."
        });
    }

    // Verify if the file exists
    if (!fs.existsSync(file)) {
      return res.status(404).json({ 
            file: file,
            error: "File not found."
        });
    }

    // Send data to Container 2
    const responseFromContainer2 = await axios.post('http://localhost:6001/process', {
      file,
      product,
    });

    // Return the response from Container 2
    res.json(responseFromContainer2.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});