"use strict";
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 2, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    }
});
module.exports = limiter;