// Import our Express dependency
const express = require('express');
// Create a new server instance
const app = express();
// Port number we want to use of this server
const PORT = 3000;

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: true}));

const frontendRoutes = require( './router' );
app.use(frontendRoutes);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

