'use strict';

let MobileDetect = require('mobile-detect');

module.exports = (req, res, next) => {
    let locals = res.locals;

    let md = new MobileDetect(req.headers['user-agent']);

    locals.devices = '';

    locals.devices += md.is('iOS') ? ' ios' : '';
    locals.devices += md.is('AndroidOS') ? ' android' : '';
    locals.devices += md.phone() || md.mobile() ? ' mobile' : '';
    locals.devices += md.tablet() ? ' tablet' : '';

    next();
};

