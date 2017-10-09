//jshint esversion: 6
const log = process.env.NODE_ENV && process.env.NODE_ENV.indexOf('development') >= 0?console.log:false;
export default {
  database: process.env.DBNAME,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  host: process.env.DBHOST,
  params: {
    dialect: '<%= dbType %>',
	 logging: log
	 <% if (dbType == 'sqlite') { %>
    ,storage: 'path/to/database.sqlite'
    <% } %>
  }
};
