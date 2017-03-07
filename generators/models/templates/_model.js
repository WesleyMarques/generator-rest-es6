//jshint esversion: 6
export default (sequelize, DataType) => {
  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    <% for(var i=0; i < modelObj.fields.length; i++) {%>
    <%= modelObj.fields[i].name %>: {
      type: DataType.<%= modelObj.fields[i].type %>,
      <% if (modelObj.fields[i].reference) {%>,
      references: {
        model: <%= modelObj.field.reference %>,
        key: <%= modelObj.field.referenceField %>,
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
      <% } %>
    },
    <% } %>
  });
  return <%= modelName %>;
};
