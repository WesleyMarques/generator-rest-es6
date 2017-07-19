// jshint esversion: 6
(function() {
  'use strict';

  const Generator = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    path = require('path'),
    _ = require('lodash'),
    pluralize = require('pluralize'),
    S = require('string'),
    fs = require('fs');

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
      this.options.modelObj.timestamps = this.options.modelObj.timestamps || true;
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
      this.destinationRoot('./server/models');
    }

    writing() {
      if (!this.fs.exists(this.destinationRoot('Controller.js'))) {
        copyTemplate(this.fs, this.templatePath('_controller.js'), this.destinationPath('Controller.js'), {
          modelName: S(this.options.modelObj.name).capitalize().toString()
        });
      }
      if (!this.fs.exists(this.destinationRoot('../../fixtures/index.js'))) {
        copyTemplate(this.fs, this.templatePath('fixtures/index.js'), this.destinationPath('../../fixtures/index.js'), {});
      }
      copyTemplate(this.fs, this.templatePath('_model.js'), this.destinationPath(this.options.modelObj.name + '.model.js'), {
        modelName: S(this.options.modelObj.name).capitalize().toString(),
        tableName: S(this.options.modelObj.name.toLowerCase()).underscore().s,
        modelObj: this.options.modelObj
      });
    }

    end() {}
  };
})();
