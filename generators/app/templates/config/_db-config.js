//jshint esversion: 6
export default {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  params: {
    dialect: '<%= dbType %>',
	 logging: process.env.NODE_ENV && process.env.NODE_ENV.indexOf('development') >= 0
  }
};
