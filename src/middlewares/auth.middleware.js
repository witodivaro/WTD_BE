const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { JWT_SECRET_KEY } = require("../config");
const User = require("../modules/user/user.model");

const options = {
  secretOrKey: JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id);

      if (user) {
        return done(null, user);
      }

      done(null, false);
    } catch (error) {
      done(error, false);
    }
  })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
