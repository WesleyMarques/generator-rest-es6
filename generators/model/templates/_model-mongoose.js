//jshint esversion: 6

export default (mongoose) => {
  let Schema = mongoose.Schema;
  mongoose.Promise = global.Promise;
  const <%= modelName %> = new Schema({
    <% for(var i=0; i < modelObj.fields.length; i++) {%>
    <%= modelObj.fields[i].name %>: {
      type: DataType.<%= modelObj.fields[i].type %>,
      required: <%= modelObj.fields[i].required %>,
    },<% } %>
  });

  return mongoose.model('<%= modelName %>', <%= modelName %>);
};
