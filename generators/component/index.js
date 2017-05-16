// jshint esversion: 6
(function() {
  'use strict';

  const Generator = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const path = require('path');
  const _ = require('lodash');

  module.exports = class extends Generator {

    constructor(args, opts) {}

    initializing() {
      this.log(yosay(
        'Welcome to the awesome ' + chalk.red('generator-ingenico-api:component') + ' generator!'
      ));
    }

    prompting(){}

    configuring(){}

    writing(){}

    end(){}
  };
})();
