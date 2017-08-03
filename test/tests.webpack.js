const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

const context = require.context('./unit', true, /test\.(js|jsx)$/);
context.keys().forEach(context);
