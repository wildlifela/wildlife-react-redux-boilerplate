import 'babel-polyfill';

window.Promise = window.Promise || require('promise-polyfill');
window.fetch = window.fetch || require('whatwg-fetch');

require('./Router.js');

