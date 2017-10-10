//jshint esversion: 6
const log = process.env.NODE_ENV && process.env.NODE_ENV.indexOf('development') >= 0 ? console.log : false;
export default {
	defaultDB: process.env.DEFAULTDB,
	database: process.env.DBNAME,
	username: process.env.DBUSERNAME,
	password: process.env.DBPASSWORD,
	params: {
		host: process.env.DBHOST,
		dialect: '<%= dbType %>',
		logging: log <% if (dbType == 'sqlite') { %>,
		storage: 'path/to/database.sqlite'
		<% } %>
	}
};
