(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize, done) {
      queryInterface.createTable('<%= modelName %>', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },<% for(var i=0; i < modelObj.fields.length; i++) {%>
        <%= modelObj.fields[i].name %>: {
          type: Sequelize.<%= modelObj.fields[i].type %>,
        },<% } %>
        <% if (modelObj.reference) {%> references: {
          model: '<%= modelObj.model %>',
          key: 'id'
        }<% } %>
      }).then(function() {
        done();
      });

    },

    down: function(queryInterface, Sequelize, done) {
      queryInterface.dropTable('<%= modelName %>').then(function() {
        done();
      });
    }
  };
})();
