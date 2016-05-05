'use strict';


//env object that applies the environment vars (this is used throughout to reference env so we can have defaults and such.
let env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development'

};



module.exports = env;
