//jshint esversion: 6
export default {
  database: process.env.DATABASE_NAME || '<DATABASE-NAME>',
  username: process.env.DATABASE_USERNAME || '<DATABASE-USERNAME>',
  password: process.env.DATABASE_PASSWORD || '<DATABASE-PASSWORD>',
  params: {
    dialect: '<%= dbType %>',
	 logging: process.env.NODE_ENV.indexOf('development') >= 0
  }
};
