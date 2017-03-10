// jshint esversion: 6
(function() {
  'use strict';

  const Generator = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const path = require('path');
  const fs = require('fs');
  const _ = require('lodash');

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
      copyTemplate(this.fs, this.templatePath('_model.js'), this.destinationPath('models/'+this.options.modelObj.name+'.model.js'),{
        modelName: this.options.modelObj.name,
        modelObj: this.options.modelObj
      });
      copyTemplate(this.fs, this.templatePath('_crud-model.js'), this.destinationPath('controllers/'+this.options.modelObj.name+'-crud-model.js'),{
        modelName: this.options.modelObj.name
      });
      copyTemplate(this.fs, this.templatePath('routes/_routes.js'), this.destinationPath('routes/'+this.options.modelObj.name+'.js'),{
        modelName: this.options.modelObj.name
      });
    }

    end() {}
  };
})();
