import _ from 'lodash';
import HTTPStatus from 'http-status';
import debug from 'debug';
import { APIClientError } from './../helpers/APIResponse';

const log = debug('lib.acl'); // eslint-disable-line

export default (req, res, next) => {
  const ACL = {
    // for "user" role
    user: [
      {
        url: '/users',
        methods: ['GET'],
      },
      {
        url: '/users/:username',
        methods: ['GET'],
      },
    ],
    // for "guest" role
    guest: [
      {
        url: '/auth/login',
        methods: ['POST'],
      },
      {
        url: '/users/register',
        methods: ['POST'],
      },
    ],
  };

  const role = req.user ? req.user.role : 'guest';
  const url = req.url;
  const method = req.method;

  // Check if the role is in the Access Control List
  if (Object.prototype.hasOwnProperty.call(ACL, role)) {
    // Check if the url is in the ACL of a specific role
    const obj = _.find(ACL[role], { url });

    // Check if the method is in the ACL of a specific role
    if (obj && obj.methods.includes(method)) {
      return next();
    }
  }

  throw new APIClientError(
    {
      message: 'Your role does not have access to this route.',
    },
    HTTPStatus.UNAUTHORIZED,
    HTTPStatus['401'],
  );
};
