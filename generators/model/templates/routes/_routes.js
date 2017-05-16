//jshint esversion:6
import <%= modelName %>
Controller from '../controllers/<%= modelName %>-crud-model';
import express from 'express';
let router = express.Router();

export default (app) => {
  const <%- modelName.toLowerCase() %>Controller = new <%= modelName %>Controller(app.dbconfig.models.<%= modelName %>);

  router.get('/<%- modelName.toLowerCase() %>', (req, res) => {
    <%- modelName.toLowerCase() %>Controller.getAll()
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.post('/<%- modelName.toLowerCase() %>', (req, res) => {
    <%- modelName.toLowerCase() %>Controller.create(req.body)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.get('/<%- modelName.toLowerCase() %>/:id', (req, res) => {
    <%- modelName.toLowerCase() %>Controller.getById(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.put('/<%- modelName.toLowerCase() %>/:id', (req, res) => {
    <%- modelName.toLowerCase() %>Controller.update(req.body, req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.delete('/<%- modelName.toLowerCase() %>/:id', (req, res) => {
    <%- modelName.toLowerCase() %>Controller.delete(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });
  return router;
};
