//jshint esversion: 6
export default (sequelize, DataType) => {
  const <%= modelName %> = sequelize.define('<%= tableName %>', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    <% for(var i=0; i < modelObj.fields.length; i++) {%>
    <%= modelObj.fields[i].name %>: {
      type: DataType.<%= modelObj.fields[i].type %>,
      required: <%= modelObj.fields[i].required %>,

    },<% } %>
  }, {
    hooks: {
      beforeCreate: (<%= modelName %>Instance, options) => {
        //TODO
      },
      afterValidate: (data, options, next) => {
        //TODO
        return next();
      }
    },
    classMethods: {
      associate: (models) => {
        <% for(var j=0; j < modelObj.references.length; j++) {%><% if (modelObj.references && modelObj.references[j].type !== '1:1') {%>
        <%= modelName %>.belongsTo(models.<%=modelObj.references[j].model%>);<% }else if(modelObj.references && modelObj.references[j].type !== '1:n'){ %>
        models.<%=modelObj.references[j].model%>.hasMany(<%= modelName %>);<% }else{ %>
        <%= modelName %>.belongsToMany(models.<%=modelObj.references[j].model%>);<% }} %>
      }
    },
    timestamps: <%=modelObj.timestamps%>,
    paranoid: true,
    freezeTableName: true,
    tableName: '<%=tableName%>'
  });

  return <%= modelName %>;
};
