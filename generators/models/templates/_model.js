//jshint esversion: 6
export default (sequelize, DataType) => {
  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    <% for(var i=0; i < modelObj.fields.length; i++) {%>
    <%= modelObj.fields[i].name %>: {
      type: DataType.<%= modelObj.fields[i].type %> ,
      <% if (modelObj.fields[i].reference) {%>
        references: {
        model: '<%= modelObj.fields[i].reference %>',
        key: '<%= modelObj.fields[i].referenceField %>'
      }
      <% } %>
    },
    <% } %>
  });
  return <%= modelName %>;
};
