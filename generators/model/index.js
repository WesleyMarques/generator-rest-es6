// jshint esversion: 6
(function() {
  'use strict';

  const Generator = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const path = require('path');
  const _ = require('lodash');
  const pluralize = require('pluralize');
  const dasherize = require('dasherize');

  var copyTemplate = (fs, template, path, options) => {
    fs.copyTpl(template, path, options);
  };

  module.exports = class extends Generator {

    constructor(args, opts) {
      super(args, opts);

      this.argument('model', {
        type: String,
        desc: 'In path format. Ex: `./Account.json`',
        required: true
      });

      this.options.modelObj = this.fs.readJSON(this.options.model);

      this.options.appname = path.basename(process.cwd());
      this.props = {};
    }

    initializing() {
      this.log(yosay(
        'Welcome to the awesome ' + chalk.red('generator-ingenico-api:models') + ' generator!'
      ));
    }

    prompting() {
      this.questions = [];
      return this.prompt(this.questions).then((answers) => {
        this.props = answers;
      });
    }

    configuring() {
      this.destinationRoot('./server');
    }

    writing() {
      copyTemplate(this.fs, this.templatePath('_model.js'), this.destinationPath('models/' + this.options.modelObj.name + '.model.js'), {
        modelName: this.options.modelObj.name,
        modelObj: this.options.modelObj,
        modelNamelc: this.options.modelObj.name.toLowerCase()
      });
      copyTemplate(this.fs, this.templatePath('_crud-model.js'), this.destinationPath('controllers/' + this.options.modelObj.name + '-crud-model.js'), {
        modelName: this.options.modelObj.name
      });
      copyTemplate(this.fs, this.templatePath('routes/_routes.js'), this.destinationPath('routes/' + this.options.modelObj.name + '.js'), {
        modelName: this.options.modelObj.name
      });
      copyTemplate(this.fs, this.templatePath('_migration.js'), this.destinationPath('../migrations/' + Date.now() + '-create-' + pluralize.plural(dasherize(this.options.modelObj.name)) + '.js'), {
        modelName: dasherize(this.options.modelObj.name),
        modelNamelc: this.options.modelObj.name.toLowerCase(),
        modelObj: this.options.modelObj
      });

      var modelObjCamel = _.camelCase(this.options.modelObj.name);
      var importValue = "import " + modelObjCamel + " from './server/routes/" + this.options.modelObj.name + "';";
      var useValue = "app.use('/" + modelObjCamel + "/'," + modelObjCamel + "(app));";
      var file = this.fs.read(this.destinationPath('../app.js'));
      file = file.replace('//import-inject', importValue + '\n//import-inject');
      file = file.replace('//router-inject', useValue + '\n//router-inject');
      this.fs.write(this.destinationPath('../app.js'), file);
    }

    end() {}
  };
})();
