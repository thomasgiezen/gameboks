const componentGenerator = require('./component');

module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('component', componentGenerator);
};
