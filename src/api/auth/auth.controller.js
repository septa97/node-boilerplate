/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["result_", "_id"] }] */
import debug from 'debug'; // eslint-disable-line
// import User from './../../models/user.model';
import { generateToken } from './../../helpers/authentication';

const log = debug('auth.controller'); // eslint-disable-line

export async function login(req, res, next) {
  try {
    const token = generateToken({
      sub: req.user._id,
    });

    res.send({
      token,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function logout(req, res, next) {
  try {
    req.logout();

    // req.user is now null after invoking the logout method

    res.send({
      message: 'Successfully logged out.',
    });
  } catch (err) {
    throw new Error(err);
  }
}
