const express = require('express');
const fs = require('fs');
const axios = require('axios');
const csv = require('csv-parser');

const app = express();
const port = 6001;

app.use(express.json());

app.post('/process', async (req, res) => {
  try {
    const { file, product } = req.body;
    const csvData = await parseCSV(file);

    var sum = 0;
    var found = false;

    for (const row of csvData) {
        const prod = row.product;
        if(prod === undefined || row.amount === undefined){
          return res.json({
            file: file,
            error: "Input file not in CSV format.",
          });
        }
        if(prod == product) {
            const amount = parseInt(row.amount);
            sum+=amount;
            found = true;
        }
    }
    if(found) {
      res.json({
        file: file,
        sum: sum,
      });
    } else {
      return res.json({
        file: file,
        error: "Input file not in CSV format.",
      });
    }
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


function parseCSV(file) {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = fs.createReadStream('/src/container-app-2/'+file);
  
      stream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});