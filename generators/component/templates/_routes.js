//jshint esversion:6
import express from 'express';

import Middleware from './middlewares';
<% if(hasValidator){%>
import validator from './validator';
<%}%>
let router = express.Router();

export default (app) => {
  <% for(var i=0; i < models.length; i++) {%>
  const middleware<%= models[i]%> = new Middleware(app.dbconfig.models['<%= models[i]%>']);
  <% } %>

  router.route('/<%- componentName.toLowerCase() %>')
  .get(middleware<%= models[i]%>.getAll(mainModel))
  .post((req, res) => {
    middleware<%= models[i]%>.create(req.body)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.route('/<%- componentName.toLowerCase() %>/:id')
  .get((req, res) => {
    middleware<%= models[i]%>.getById(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  })
  .put('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    middleware<%= models[i]%>.update(req.body, req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  }).delete('/<%- componentName.toLowerCase() %>/:id', (req, res) => {
    middleware<%= models[i]%>.delete(req.params)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });
  return router;
};
