import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.js";

import { users } from "../data/mongo/Manager.mongo.js";

passport.use("register", new LocalStrategy(
  { passReqToCallback: true, usernameField: "email"},
  async(req, email, password, done) => {
    try {
      let one = await users.readByEmail(email);
      if (one) {
        return done(null, false);
      } else {
        let data = req.body;
        data.password = createHash(password);
        let user = await users.create(data);
        return done(null, user);
      }
    } catch (error) {
      done(error);
    }
  }
));

// passport.use("login", new LocalStrategy(
//   { passReqToCallback: true },
//   async() => {}
// ));

export default passport;
