const injectTapEventPlugin = require('react-tap-event-plugin');
require('babel-polyfill');
require('isomorphic-fetch');

injectTapEventPlugin();
process.env.NODE_ENV = 'TESTING';

const context = require.context('./unit', true, /test\.(js|jsx)$/);
context.keys().forEach(context);
