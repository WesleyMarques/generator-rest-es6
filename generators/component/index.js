// jshint esversion: 6
(function() {
  'use strict';

  const Generator = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    path = require('path'),
    _ = require('lodash'),
    upperCamelCase = require('uppercamelcase'),
    fs = require('fs');

  var copyTemplate = (fs, template, path, options) => {
    fs.copyTpl(template, path, options);
  };

  module.exports = class extends Generator {

    constructor(args, opts) {
      super(args, opts);
      this.options.appname = path.basename(process.cwd());
      this.props = {};
      const dir = this.destinationRoot('./server/models');
      const models = [];
      try {
        if (!fs.existsSync(dir)) return {};
        fs.readdirSync(dir).forEach(file => {
          const modelDir = path.join(dir, file).split(path.sep);
          models.push(modelDir[modelDir.length - 1].split('.')[0]);
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.models = models;
      }
    }

    initializing() {
      this.log(yosay(
        'Welcome to the awesome ' + chalk.red('generator-ingenico-api:component') + ' generator!'
      ));
    }

    prompting() {
      this.questions = [];
      this.questions = this.questions.concat({
        type: 'input',
        name: 'componentName',
        message: 'Your component name',
        default: 'newComponent'
      }, {
        type: 'confirm',
        name: 'validations',
        message: 'Do you want add validations in controllers?',
      },
      {
        type: 'checkbox',
        name: 'models',
        message: 'Select all models',
        choices: this.models,
        default: 'newComponent'
      });
      return this.prompt(this.questions).then((answers) => {
        answers.componentName = upperCamelCase(answers.componentName);
        this.props = answers;
      });
    }

    configuring() {
      // this.destinationRoot('./server/components/' + this.props.componentName);
    }

    writing() {
      copyTemplate(this.fs, this.templatePath('_routes.js'), this.destinationPath('./index.js'), {
        componentName: this.props.componentName,
        models: this.props.models
      });
      // copyTemplate(this.fs, this.templatePath('_middlewares.js'), this.destinationPath('./middlewares.js'), {
      //   componentName: this.props.componentName,
      //   models: this.props.models
      // });
      // if(this.props.validations){
      //   copyTemplate(this.fs, this.templatePath('_validator.js'), this.destinationPath('./validations.js'), {
      //     componentName: this.props.componentName,
      //     models: this.props.models
      //   });
      // }
      // copyTemplate(this.fs, this.templatePath('_test.js'), this.destinationPath('./unit.test.js'), {
      //   componentName: this.props.componentName,
      //   models: this.props.models
      // });


    }

    end() {}
  };
})();
