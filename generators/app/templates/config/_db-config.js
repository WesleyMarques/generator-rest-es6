//jshint esversion: 6
export default {
  database: '<DATABASE-NAME>',
  username: '<DATABASE-USERNAME>',
  password: '<DATABASE-PASSWORD>',
  params: {
    dialect: '<%= dbType %>',
    define: {
      underscored: true,
    },
  }
};
