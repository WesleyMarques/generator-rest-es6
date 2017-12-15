// jshint esversion: 6
(function() {
  'use strict';

  const Generator = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const path = require('path');
  const fs = require('fs');
  const _ = require('lodash');
  var npmInstallpks = ['express', 'debug', 'body-parser', 'cors', 'compression', 'morgan',
    'cookie-parser', 'http-status'
  ];

  var copyTemplate = (fs, template, path, options) => {
    fs.copyTpl(template, path, options);
  };

  var chooseDBImage = (dbType) => {
    switch (dbType) {
      case 'postgres':
        npmInstallpks = npmInstallpks.concat(['pg', 'pg-hstore']);
        return {
          image: 'postgres',
          port: '5432:5432',
          path: '/var/lib/postgresql',
          environment: [],
          user: 'postgres',
          pw: ''
        };
      case 'mysql':
        npmInstallpks = npmInstallpks.concat(['mysql2']);
        return {
          image: "mysql",
          port: "3306:3306",
          path: '/var/lib/mysql',
          environment: ['MYSQL_ROOT_PASSWORD=root'],
          user: 'root',
          pw: 'root'
        };
      case 'sqlite':
        npmInstallpks = npmInstallpks.concat(['sqlite3']);
        return {
          image: "dockerpinata/sqlite",
          port: "12345:12345",
          path: '',
          environment: []
        };
      case 'mssql':
        npmInstallpks = npmInstallpks.concat(['tedious']);
        return {
          image: "microsoft/mssql-server-linux",
          port: "1433:1433",
          path: '/var/opt/mssql',
          environment: ['ACCEPT_EULA=Y', 'SA_PASSWORD=Admin12345'],
          pw: 'Admin12345'
        };
      case 'mongodb':
        return {
          image: "mongo",
          port: "27017:27017",
          path: '/data/db',
          environment: []
        };
      default:
        return '';
    }
  };

  module.exports = class extends Generator {

    constructor(args, opts) {
      super(args, opts);
      this.option('skip-install');

      this.options.appname = path.basename(process.cwd());
      this.props = {};
    }

    initializing() {
      this.log(yosay(
        'Welcome to the awesome ' + chalk.red('generator-rest-es6') + ' generator!'
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
          'none',
          'MongoDB',
          'Postgres',
          'Mysql',
          'Mssql'
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
      copyTemplate(this.fs, this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
      copyTemplate(this.fs, this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
      copyTemplate(this.fs, this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
      copyTemplate(this.fs, this.templatePath('_Dockerfile'), this.destinationPath('Dockerfile'));

      let dockerDBImage = chooseDBImage(this.props.database.toLowerCase());
      copyTemplate(this.fs, this.templatePath('.env'), this.destinationPath('.env'), {
        appName: this.props.appname.toLowerCase(),
        dbType: this.props.database.toLowerCase(),
        dbUser: dockerDBImage.user,
        dbPass: dockerDBImage.pw,
        environment: dockerDBImage.environment
      });
      copyTemplate(this.fs, this.templatePath('_docker-compose.yml'), this.destinationPath('docker-compose.yml'), {
        appName: this.props.appname.toLowerCase(),
        dbType: this.props.database.toLowerCase(),
        dbImage: dockerDBImage.image,
        dbPorts: dockerDBImage.port,
        dbPath: dockerDBImage.path
      });

      copyTemplate(this.fs, this.templatePath('_package.json'), this.destinationPath('package.json'), {
        appName: this.props.appname
      });
      copyTemplate(this.fs, this.templatePath('config/_config.json'), this.destinationPath('config/config.json'), {
        appName: this.props.appname.toLowerCase(),
        dbType: this.props.database.toLowerCase()
      });
      copyTemplate(this.fs, this.templatePath('config/_db-config.js'), this.destinationPath('config/db-config.js'), {
        dbName: this.props.appname,
        dbType: this.props.database.toLowerCase()
      });

      copyTemplate(this.fs, this.templatePath('bin/_www'), this.destinationPath('bin/www'), {
        appName: this.props.appname
      });
      copyTemplate(this.fs, this.templatePath('_app.js'), this.destinationPath('app.js'), {
        appName: this.props.appname
      });

      if (this.props.database.toLowerCase().indexOf('mongodb') >= 0) {
        npmInstallpks = npmInstallpks.concat(['mongoose'])
        copyTemplate(this.fs, this.templatePath('models/_index-mongoose.js'), this.destinationPath('server/models/index.js'), {
          appName: this.props.appname
        });
      } else {
        npmInstallpks = npmInstallpks.concat(['sequelize', 'sequelize-cli', 'sequelize-fixtures'])
        copyTemplate(this.fs, this.templatePath('models/_index.js'), this.destinationPath('server/models/index.js'), {
          appName: this.props.appname
        });
      }

      copyTemplate(this.fs, this.templatePath('components/_index.js'), this.destinationPath('server/components/index.js'), {});

      copyTemplate(this.fs, this.templatePath('test/**/*'), this.destinationPath('test/'));

    }

    end() {
      console.log('npms');
      console.log(npmInstallpks);
      this.npmInstall(npmInstallpks, {
        'save': true
      });
      this.npmInstall(['mocha', 'chai', 'nodemon', 'supertest', 'testdouble', 'babel-cli',
        'babel', 'babel-preset-es2015', 'babel-preset-es2017'
      ], {
        'saveDev': true
      });
    }
  };
})();
