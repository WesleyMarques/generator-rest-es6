//jshint esversion: 6
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const loadModels = (sequelize, app) => {
	const dir = path.join(__dirname, '../server/models/');
	const models = [];
	try {
		if (!fs.existsSync(dir)) return {};
		fs.readdirSync(dir).forEach(file => {
			const modelDir = path.join(dir, file);
			const model = sequelize.import(modelDir);
			models[model.name] = model;
		});
	} catch (e) {
		app.log.error(e);
	} finally {

	}
	return models;
};

export default function(app) {
	if (!database) {
		const config = app.configdb;
		let sequelize;
		if (process.env.DB_URI) {
			sequelize = new Sequelize(process.env.DB_URI);
		} else {
			sequelize = new Sequelize(
				config.database,
				config.username,
				config.password,
				config.params
			);
		}

		database = {
			sequelize,
			Sequelize,
			models: {},
		};

		database.models = loadModels(sequelize, app);

		sequelize.sync().done(() => database);
	}
	return database;
}
