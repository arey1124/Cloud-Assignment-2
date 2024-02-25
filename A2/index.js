const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 80;

var connection = mysql.createConnection({
  host     : "database-2.ctey4ykc0dav.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "Cloud123",
  port     : "3306",
  database : "Cloud2",
});

// Route to store products
app.post('/store-products', (req, res) => {
  const products = req.body.products;

  if (!Array.isArray(products)) {
    return res.status(400).send(products);
  }

  products.forEach(product => {
    const query = `INSERT INTO products (name, price, availability) VALUES (?, ?, ?)`;
    connection.query(query, [product.name, product.price, product.availability], (err, result) => {
      if (err) {
        console.error('Error inserting product: ', err);
        return res.status(500).send('Internal Server Error');
      }
    });
  });

  return res.status(200).send({"message" : "Success."});
});

// Route to list products
app.get('/list-products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error querying products: ', err);
      return res.status(500).send('Internal Server Error');
    }

    return res.status(200).json({"products" :results});
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
