import Joi from 'joi';

export default {
  getAll: {},
  getUser: {
    params: {
      username: Joi.string().required(),
    },
  },
  register: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      firstName: Joi.string().required(),
      middleName: Joi.string().required(),
      lastName: Joi.string().required(),
    },
  },
};
