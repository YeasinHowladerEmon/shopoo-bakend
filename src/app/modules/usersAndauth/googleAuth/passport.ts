import passport from "passport";
import { passportConfig } from "../../../../config/passportConfig";
import { User } from "../auth.model";
import { IUserAndLogin } from "../auth.interface";

const GoogleStrategy = require("passport-google-oauth20").Strategy;



passport.serializeUser((user: any, done: any) => {
  return done(null, user);
})

passport.deserializeUser((user: any, done: any) => {
  return done(null, user);
})








passport.use(
  new GoogleStrategy(
    passportConfig.googleConfig,
    async (
      profile: {
        id: string;
        emails: { value: string }[];
        name: {
          givenName: string;
          familyName: string;
        };
        phone?: string;
      },
      done: (error: Error | null, user: IUserAndLogin | null) => void
    ) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          _id: profile.id,
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          phone: profile?.phone || ""
        });
        newUser.role = "user";
        const savedUser = await newUser.save();

        done(null, savedUser);
      } catch (error) {
        done(error as Error, null);
      }
    }
  )
);
