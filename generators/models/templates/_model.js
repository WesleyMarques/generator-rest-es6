//jshint esversion: 6
export default (sequelize, DataType) => {
  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    <% for(var i=0; i < modelObj.fields.length; i++) {%><%= modelObj.fields[i].name %>: {
      type: DataType.<%= modelObj.fields[i].type %>
    },<% } %>
  });
  <% if (modelObj.reference && modelObj.reference.type === '1:1') {%>
    <%= modelName %>.hasOne(<%=modelObj.reference.model%>);
  <% } %>
  <% if (modelObj.reference && modelObj.reference.type === '1:n') {%>
    <%= modelName %>.hasMany(<%=modelObj.reference.model%>, {as: '<%=modelObj.reference.model%>Id'});
  <% } %>
  <% if (modelObj.reference && modelObj.reference.type === 'n:m') {%>
    <%= modelName %>.belongsToMany(<%=modelObj.reference.model%>, {through: '<%= modelName %><%=modelObj.reference.model%>'});
  <% } %>
  return <%= modelName %>;
};
