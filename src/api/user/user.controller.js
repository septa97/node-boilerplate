/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["result_", "_id"] }] */
import debug from 'debug'; // eslint-disable-line
// import nodemailer from 'nodemailer';
import User from './../../models/user.model';
import { generateToken } from './../../helpers/authentication';

const log = debug('user.controller'); // eslint-disable-line

export async function getAll(req, res, next) {
  try {
    const users = await User.find();

    res.send({
      data: users,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username });

    res.send({
      data: user,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function register(req, res, next) {
  try {
    // Check if password and confirmPassword are the same
    if (req.body.password !== req.body.confirmPassword) {
      res.send({
        message: 'Passwords does not match!',
      });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne().or([
      { email: req.body.email },
      { username: req.body.username },
    ]);

    // If another user with the same username of email already exists
    if (existingUser) {
      if (existingUser.email === req.body.email) {
        res.send({
          message: 'Email already exists.',
        });
      }

      if (existingUser.username === req.body.username) {
        res.send({
          message: 'Username already exists.',
        });
      }
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
    });

    const result = await user.save();
    const token = generateToken({
      sub: result._id,
    });

    res.send({
      token,
    });
  } catch (err) {
    throw new Error(err);
  }
}
