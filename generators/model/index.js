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

  var injectRouter = (modelObj) => {
    var modelObjCamel = _.camelCase(modelObj.name);
    var importValue = "import " + modelObjCamel + " from './server/routes/" + modelObj.name + "';";
    var useValue = "app.use('/" + modelObjCamel + "/'," + modelObjCamel + "(app));";
    var file = this.fs.read(this.destinationPath('../app.js'));
    file = file.replace('//import-inject', importValue + '\n//import-inject');
    file = file.replace('//router-inject', useValue + '\n//router-inject');
    return file;
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
      this.destinationRoot('./server');
    }

    writing() {
      copyTemplate(this.fs, this.templatePath('_model.js'), this.destinationPath('models/' + this.options.modelObj.name + '.model.js'), {
        modelName: S(this.options.modelObj.name).capitalize().toString(),
        tableName: S(this.options.modelObj.name.toLowerCase()).underscore().s,
        modelObj: this.options.modelObj
      });
      copyTemplate(this.fs, this.templatePath('_controller.js'), this.destinationPath('models/' + this.options.modelObj.name + '.controller.js'), {
        modelName: S(this.options.modelObj.name).capitalize().toString()
      });
      // copyTemplate(this.fs, this.templatePath('_migration.js'), this.destinationPath('../migrations/' + Date.now() + '-create-' + pluralize.plural(dasherize(this.options.modelObj.name)) + '.js'), {
      //   modelName: S(this.options.modelObj.name).capitalize().toString(),
      //   tableName: S(this.options.modelObj.name.toLowerCase()).underscore().s,
      //   modelObj: this.options.modelObj,
      //   S: S
      // });

      //inject router in file
      this.fs.write(this.destinationPath('../app.js'), injectRouter(this.options.modelObj));

    }

    end() {}
  };
})();
