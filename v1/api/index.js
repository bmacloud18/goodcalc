// Import our Express dependency
const express = require('express');
// Create a new server instance
const app = express();
// Port number we want to use of this server
const PORT = 3000;

// Designate the public folder as the location to look for static resources
app.use(express.static('public'));


const path = require('path');
const html_dir = path.join(__dirname, '../static/templates/');

// Set up Middleware
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(html_dir + 'index.html');
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

