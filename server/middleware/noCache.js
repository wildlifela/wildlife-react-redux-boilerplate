'use strict';

module.exports = (req, res, next) => {
    res.set({
        'Cache-Control': 'public, must-revalidate, proxy-revalidate, max-age=0'
    });
    next();
};

