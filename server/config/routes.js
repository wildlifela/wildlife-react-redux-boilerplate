'use strict';

let express = require('express');
let index = require('../controllers');


module.exports = app => {
    app.use(express.static('public'));


    app.get('*', index );

};
