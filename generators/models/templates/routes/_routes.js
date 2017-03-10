//jshint esversion:6
import <%= modelName %>Controller from '../controllers/<%= modelName %>-crud-model';

export default (app) => {
  const <%- modelName.toLowerCase() %>Controller = new <%= modelName %>Controller(app.dbconfig.models.<%= modelName %>);
  app.route('/<%- modelName.toLowerCase() %>')
  .all(app.auth.authenticate())
  .get((req, res) => {
    <%- modelName.toLowerCase() %>Controller.getAll()
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  })
  .post((req, res) => {
    <%- modelName.toLowerCase() %>Controller.create(req.body)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  });

  app.route('/<%- modelName.toLowerCase() %>/:id')
  .all(app.auth.authenticate())
  .get((req, res) => {
    <%- modelName.toLowerCase() %>Controller.getById(req.params)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  })
  .put((req, res) => {
    <%- modelName.toLowerCase() %>Controller.update(req.body, req.params)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  })
  .delete((req, res) => {
    <%- modelName.toLowerCase() %>Controller.delete(req.params)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  });
};
