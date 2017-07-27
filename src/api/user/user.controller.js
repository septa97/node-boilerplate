/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import debug from 'debug';

const log = debug('user.controller');

export function getAll(req, res, next) {
  try {
    log('getAll invoked');
    log(req.url);
    res.send({ message: 'getAll invoked' });
  } catch (err) {
    log(`#getAll Error: ${err}`);
  }
}

export function getUser(req, res, next) {
  try {
    log('getUser invoked');
    log(req.url);
    res.send({ message: 'getUser invoked' });
  } catch (err) {
    log(`#getUser Error: ${err}`);
  }
}
