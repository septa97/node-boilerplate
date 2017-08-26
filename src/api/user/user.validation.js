import Joi from 'joi';

export default {
  getAll: {},
  getUser: {
    params: {
      id: Joi.number().integer(),
    },
  },
};
