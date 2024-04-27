const express = require( 'express' );
const router = express.Router();

router.use(express.static('static'));
router.use(express.urlencoded({extended: true}));

const path = require('path');
const html_dir = path.join(__dirname ,'./views/');

// base
router.get('/', (req, res) => {
    res.sendFile(`${html_dir}calc.html`);
});

// base
router.get('/calc', (req, res) => {
    res.sendFile(`${html_dir}calc.html`);
});


// base
router.get('/calculator', (req, res) => {
    res.sendFile(`${html_dir}calc.html`);
});

module.exports = router;