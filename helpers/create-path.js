const path = require('path');

const createPath = (pageName) => path.resolve(__dirname, '../ejs-views', `${pageName}.ejs`);

module.exports = createPath;

