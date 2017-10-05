const injectTapEventPlugin = require('react-tap-event-plugin');
require('babel-polyfill');
require('isomorphic-fetch');

injectTapEventPlugin();

const components = require.context('../app/components', true, /\.(js|jsx)$/);
components.keys().forEach(components);

const observers = require.context('../app/observers', true, /\.(js|jsx)$/);
observers.keys().forEach(observers);

const stores = require.context('../app/stores', true, /\.(js|jsx)$/);
stores.keys().forEach(stores);

const context = require.context('./unit', true, /test\.(js|jsx)$/);
context.keys().forEach(context);
