//jshint esversion: 6
export default (sequelize, DataType) => {
  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    <% for(var i=0; i < modelObj.fields.length; i++) {%><%= modelObj.fields[i].name %>: {
      type: DataType.<%= modelObj.fields[i].type %>
    },<% } %>
  }, {
    classMethods: {
      associate: function(models) {
        <% for(var j=0; j < modelObj.references.length; j++) {%>
        <% if (modelObj.references && modelObj.references[j].type !== '1:1') {%>
        <%= modelName %>.belongsTo(models.
          <%=modelObj.references[j].model%>);
        <% }else if(modelObj.references && modelObj.references[j].type !== '1:n'){ %>
        models.<%=modelObj.references[j].model%>.hasMany(<%= modelName %>);
        <% }else{ %>
        <%= modelName %>.belongsToMany(models.
          <%=modelObj.references[j].model%>);
        <% }} %>
      }

    },
    freezeTableName: true,
    tableName: '<%=modelNamelc%>'
  });

  return <%= modelName %>;
};
