(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize, done) {
      queryInterface.createTable('<%= modelName %>', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        <%if(modelObj.timestamps){%>createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },<%}%>
        deletedAt: {
          type: Sequelize.DATE
        },
        <% for(var i=0; i < modelObj.fields.length; i++) {%><%= modelObj.fields[i].name %>: {
          type: Sequelize.<%= modelObj.fields[i].type %>,
        },<% } %>
        <% for(var j=0; j < modelObj.references.length; j++) {%>
        <% if (modelObj.references && modelObj.references[j].type !== '1:1') {%>
        <%= modelObj.references[j].model.toLowerCase() %>_id: {
          type: Sequelize.UUID,
          references: {
            model: '<%=S(modelObj.references[j].model.toLowerCase())).underscore().s%>',
            key: 'id',
            deferrable: Sequelize.Deferrable.NOT
          }
        },
        <% }else if(modelObj.references && modelObj.references[j].type !== '1:n'){ %>
        <%= modelObj.references[j].model.toLowerCase() %>_id: {
          type: Sequelize.UUID,
          references: {
            model: '<%=modelObj.references[j].model.toLowerCase()%>',
            key: 'id',
            deferrable: Sequelize.Deferrable.NOT
          }
        },<% }} %>
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
