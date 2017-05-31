//jshint esversion:6
import Middleware from './middlewares';
import express from 'express';
let router = express.Router();

export default (app) => {

  const mainModel = "Model";

  router.get('/<%- componentName.toLowerCase() %>', Middleware.getAll(mainModel));

  router.post('/<%- componentName.toLowerCase() %>', (req, res) => {
    Controller.create(req.body)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.get('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    <%- componentName.toLowerCase() %>Controller.getById(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.put('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    <%- componentName.toLowerCase() %>Controller.update(req.body, req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.delete('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    <%- componentName.toLowerCase() %>Controller.delete(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });
  return router;
};
