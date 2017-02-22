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
      this.destinationRoot('./' + this.props.appname);
    }

    writing() {
      copyTemplate(this.fs, this.templatePath('.jshint'), this.destinationPath('.jshint'));
      copyTemplate(this.fs, this.templatePath('app.js'), this.destinationPath('app.js'));
      copyTemplate(this.fs, this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
      copyTemplate(this.fs, this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
      copyTemplate(this.fs, this.templatePath('.babelrc'), this.destinationPath('.babelrc'));

      copyTemplate(this.fs, this.templatePath('_package.json'), this.destinationPath('package.json'), {
        appName: this.props.appname
      });
      copyTemplate(this.fs, this.templatePath('bin/_www'), this.destinationPath('bin/www'), {
        appName: this.props.appname
      });
      copyTemplate(this.fs, this.templatePath('config/*'), this.destinationPath('config/'));
      copyTemplate(this.fs, this.templatePath('server/*'), this.destinationPath('server/'));


    }

    end() {
      this.npmInstall(['express', 'debug', 'body-parser', 'cors', 'compression', 'morgan', 'cookie-parser'], {
        'save': true
      });
      this.npmInstall(['mocha', 'chai', 'nodemon', 'supertest', 'testdouble', 'babel-cli', 'babel', 'babel-preset-es2015', 'babel-preset-stage-2'], {
        'saveDev': true
      });
    }
  };
})();
