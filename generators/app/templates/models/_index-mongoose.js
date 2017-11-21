//jshint esversion: 6
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
let database = null;

const loadModels = (mongooseInst) => {
	const dir = path.join(__dirname, './');
	const models = [];
	try {
		if (!fs.existsSync(dir)) return {};
		fs.readdirSync(dir).filter(function(file) {
			return (file.indexOf(".") !== 0) && (file !== "index.js");
		}).forEach(file => {
			const modelDir = path.join(dir, file);
			const model = modelDir.split('.')[0];
			models[model.name] = require('./' + moduleName)(mongooseInst);
		});
	} catch (e) {
		console.error(e);
	} finally {

	}
	return models;
};

export default function(configdb) {
	if (!database) {
		const config = configdb;
		mongoose.Promise = global.Promise;
		let conn;
		if (process.env.DATABASE_URI) {
			conn = mongoose.connect(process.env.DATABASE_URI, {
				useMongoClient: true
			});
		} else {
			conn = mongoose.connect('mongodb://'+config.params.host+':27017/'+config.database, {
				useMongoClient: true
			});
		}

		database = {
			models: {},
			mongoose: conn,
			Mongoose: mongoose
		};

		database.models = loadModels(mongooseInst);
	}
	return database;
}
