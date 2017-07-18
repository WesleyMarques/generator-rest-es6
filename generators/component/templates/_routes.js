//jshint esversion:6
import express from 'express';

import Middleware from './middlewares';
let router = express.Router();

export default (app) => {
  <% for(var i=0; i < models.length; i++) {%>
  const middleware<%= models[i]%> = new Middleware(app.dbconfig.models['<%= models[i]%>']);
  <% } %>

  router.route('/<%- componentName.toLowerCase() %>')
  .get(middleware.getAll(mainModel))
  .post((req, res) => {
    Controller.create(req.body)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.route('/<%- componentName.toLowerCase() %>/:id')
  .get((req, res) => {
    Controller.getById(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  })
  .put('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    Controller.update(req.body, req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  }).delete('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    Controller.delete(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });
  return router;
};
