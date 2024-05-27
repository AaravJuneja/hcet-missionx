const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connectUsers = require("./User");

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const users = await connectUsers();
        const user = await users.findOne({ username });

        if (!user) {
            return done(null, false, { message: 'No user with that username' });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        const users = await connectUsers();
        const user = await users.findOne({ _id: id });
        done(null, user);
    });
}

module.exports = initialize;