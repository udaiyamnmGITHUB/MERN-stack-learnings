const express = require('express');
const appAuth  = require('../../middleware/auth');
const User  = require('../../models/User');

const router = express.Router();

// @route  GET  api/auth
// @desc   Test route
// @access Public
router.get('/', appAuth, async (req, res)=>{
    try {

        const user = await User.findById(req.user.id).select(['-password', '-_id', '-__v']);
        res.json(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;