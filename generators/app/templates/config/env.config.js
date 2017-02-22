/*jshint esversion: 6*/
export default {
  "development": {
    "secret": "development",
    "PORT": 3000,
    "DB_URI": ""
  },
  "production": {
    "secret": "production",
    "PORT": 8080,
    "DB_URI": ""
  },
  "test": {
    "secret": "test",
    "PORT": 3005,
    "DB_URI": ""
  }
};
