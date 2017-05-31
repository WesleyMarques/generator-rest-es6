//jshint esversion: 6
import HttpStatus from 'http-status';

let instance = null;

class Controller {

  constructor(currentModel) {
    if (!instance) {
      instance = this;
    }
    this.Model = currentModel;
    return instance;
  }

  getAll() {
    return this.Model.findAll({})
      .then(result => result)
      .catch(error => error.message);
  }

  getById(params) {
    return this.Model.findOne({
        where: params,
      })
      .then(result => result)
      .catch(error => error.message);
  }

  create(data) {
    return this.Model.create(data)
      .then(result => result)
      .catch(error => error.message);
  }

  update(data, params) {
    return this.Model.update(data, {
        where: params,
      })
      .then(result => result)
      .catch(error => error.message);
  }

  delete(params) {
    return this.Model.destroy({
        where: params,
      })
      .then(result => result)
      .catch(error => error.message);
  }
}

export default Controller;
