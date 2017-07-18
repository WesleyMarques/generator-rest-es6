//jshint esversion: 6
import HttpStatus from 'http-status';

import Controller from '../../models/Controller';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class Middleware extends Controller{
  constructor(modelInst){
    super(modelInst);
  }

  //Override getAll()
  getAll() {
    super.getAll()
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  }


}

export default Middleware;
