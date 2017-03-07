//jshint esversion: 6
export default {
  database: '<%= dbName %>',
  username: '',
  password: '',
  params: {
    dialect: '<%= dbType %>',
    define: {
      underscored: true,
    },
  }
};
