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
      this.option('skip-install');
      this.argument('appname', {
        type: String,
        desc: 'In module format. Ex: `ingenico-terminal`',
        required: false
      });

      this.options.appname = this.appname || path.basename(process.cwd());

      this.props = {};
    }

    initializing() {
      this.log(yosay(
        'Welcome to the awesome ' + chalk.red('generator-ingenico-api') + ' generator!'
      ));
    }

    prompting() {
      this.questions = [];
      this.questions = this.questions.concat({
        type: 'input',
        name: 'appname',
        message: 'Your project name',
        default: this.options.appname // Default to current folder name
      }, {
        type: 'list',
        name: 'database',
        message: 'Select a database to use:',
        choices: [
          'None',
          'MongoDB',
          'Postgress'
        ]
      });
      return this.prompt(this.questions).then((answers) => {
        this.props = answers;
      });
    }

    configuring() {
      copyTemplate(this.fs, this.templatePath('_package.json'), this.destinationPath('package.json'), {
        appName: this.props.appname
      });
    }
  };
})();
