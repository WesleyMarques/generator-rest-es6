//jshint esversion:6
<% for(var i=0; i < models.length; i++) {import <%= models[i]%>Controller from '../models/<%=models[i]%>.controller.js';<% } %>

import express from 'express';
let router = express.Router();

export default (app) => {
  for(var i=0; i < models.length; i++) {const <%- models[i].toLowerCase() %>Controller = new Controller(app.dbconfig.models.<%= models[i] %>);<% } %>

  router.get('/<%- componentName.toLowerCase() %>', (req, res) => {
    <%- componentName.toLowerCase() %>Controller.getAll()
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.post('/<%- componentName.toLowerCase() %>', (req, res) => {
    <%- componentName.toLowerCase() %>Controller.create(req.body)
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
