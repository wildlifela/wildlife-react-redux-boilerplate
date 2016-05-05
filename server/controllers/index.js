'use strict';

let response = require('../utilities/response');

module.exports = (req, res) => {
    response.view(res, 'index');
};

