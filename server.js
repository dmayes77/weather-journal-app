// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/api', (req, res) => {
  res.send(projectData);
});

app.post('/api', (req, res) => {
  let { date, cityName, temp, content } = req.body;
  projectData = { date, cityName, temp, content };
  res.send(projectData);
});

// Setup Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
