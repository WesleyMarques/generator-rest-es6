//jshint esversion: 6
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import sequelizeFixtures from 'sequelize-fixtures';
const Op = Sequelize.Op;
let database = null;

const loadModels = (sequelize) => {
	const dir = path.join(__dirname, './');
	const models = [];
	try {
		if (!fs.existsSync(dir)) return {};
		fs.readdirSync(dir).filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        }).forEach(file => {
			const modelDir = path.join(dir, file);
			const model = sequelize.import(modelDir);
			models[model.name] = model;
		});

		Object.keys(models).forEach(function(modelName) {
			if ("associate" in models[modelName]) {
				models[modelName].associate(models);
			}
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
		config.params.operatorsAliases = Op;
		let sequelize;
		if (process.env.DATABASE_URI) {
			sequelize = new Sequelize(process.env.DATABASE_URI, config.params);
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

		database.models = loadModels(sequelize);

		sequelize.sync().done(() => database);
	}
	return database;
}
