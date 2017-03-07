//jshint esversion: 6
import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class <%= modelName %>Controller {
  constructor(<%= modelName %>) {
    this.<%= modelName %> = <%= modelName %>;
  }

  getAll() {
    return this.<%= modelName %>.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.<%= modelName %>.findOne({
      where: params,
    })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.<%= modelName %>.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.<%= modelName %>.update(data, {
      where: params,
    })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.<%= modelName %>.destroy({
      where: params,
    })
    .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default <%= modelName %>Controller;
