const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
router.use(authenticate);
router.get('/',(req,res)=>{
    const userId = req.user.id;
    res.json({ message: 'Protected route accessed', userId });
// res.send('Hello World')
});

module.exports = router;
