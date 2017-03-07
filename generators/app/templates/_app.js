/*jshint esversion: 6*/
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import datasource from './config/datasource';
import dbconfig from './config/config';

import config from './config/env.config';

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

cors({
  credentials: true,
  origin: true
});
app.use(cors());

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.config = config[process.env.NODE_ENV || 'development'];
app.dbconfig = datasource(app);

export default app;
