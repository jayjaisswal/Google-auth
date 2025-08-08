const express = require('express');
const router = express.Router();
const {googleLogin} = require('../controllers/googleLogin');



// http://localhost:4000/auth/test
router.get('/test', (req, res) => {  
    res.send('Auth route is working');
})


// google login route
// http://localhost:4000/auth/google
router.get('/google', googleLogin)

module.exports = router;


