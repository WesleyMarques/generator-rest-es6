/*jshint esversion: 6*/
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import debug from 'debug';

import datasource from './server/models/';
import dbconfig from './config/db-config';

import routes from './server/components/';


const log = debug('<%= appName %>:server');
const logError = debug('<%= appName %>:error:server');
logError.color = 1;
log.color = 2;



const app = express();
app.log = {
	info: log,
	error: logError
};

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

app.configdb = dbconfig;
app.dbconfig = datasource(app.configdb);

app.use('/api/v1/',routes(app));

export default app;
