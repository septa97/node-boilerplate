import passport from 'passport';
import debug from 'debug'; // eslint-disable-line
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user.model';

const log = debug('passport'); // eslint-disable-line
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const localOptions = {
  usernameField: 'email',
};

// JWT Strategy
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user specified in the token
      const user = await User.findById(payload.sub);

      // Check if user doesn't exists
      if (!user) {
        return done(null, false);
      }

      // Return the user if it exists
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

// Local Strategy
passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      // Check if the email exists
      const user = await User.findOne({ email });

      // If the user does not exists given the email
      if (!user) {
        return done(null, false);
      }

      // Check if the password is correct
      const validPassword = await user.isValidPassword(password);

      if (!validPassword) {
        return done(null, false);
      }

      // Return the user details if the password and email is correct
      // req.user is now contains the user details
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);
