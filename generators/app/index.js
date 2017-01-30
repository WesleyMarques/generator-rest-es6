(function(){
  'use strict';
  var Generator = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');

  module.exports = Generator.extend({
    prompting: function () {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the awesome ' + chalk.red('generator-ingenico-api') + ' generator!'
      ));

      var prompts = [{
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }];

      return this.prompt(prompts).then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
    },

    writing: function () {
      this.fs.copy(
        this.templatePath('dummyfile.txt'),
        this.destinationPath('dummyfile.txt')
      );
    },

    install: function () {
      this.installDependencies();
    }
  });P  bac

}
)();
