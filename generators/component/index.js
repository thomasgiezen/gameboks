const fs = require('fs');
const path = require('path');

const jsPath = '../src';

module.exports = {
  description: 'Create component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the component name?',
      validate: (value) => {
        if (!value) {
          // return error message if name is not defined
          return 'The name is required';
        }

        if (/\s+/g.test(value)) {
          // return error message if name contain spaces
          return 'The name cannot contain spaces';
        }

        if (fs.existsSync(path.join(__dirname, '../src/components', value))) {
          // return error message if component already exists
          return 'A component with this name already exists';
        }

        return true;
      },
    }, {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      choices: ['Stateless Component', 'ES6 Class'],
      default: 'Stateless Component',
    },
  ],
  actions: (data) => {
    // default actions
    return [
      {
        type: 'add',
        path: `${jsPath}/components/{{properCase name}}/index.js`,
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      }, {
        type: 'add',
        path: `${jsPath}/components/{{properCase name}}/{{properCase name}}.jsx`,
        templateFile: `./component/${data.type === 'ES6 Class' ? 'class' : 'stateless'}.js.hbs`,
        abortOnFail: true,
      },
    ];
  },
};
