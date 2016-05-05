'use strict';

let env = require('../config/env');

module.exports = (req, res, next) => {
    let locals = res.locals;
    locals.env = env;
    next();
};
