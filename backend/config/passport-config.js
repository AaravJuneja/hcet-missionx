const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectUsers = require('../models/User');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const users = await connectUsers();
      const user = await users.findOne({ username });

      if (!user || user.password !== password) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await connectUsers();
    const user = await users.findOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
