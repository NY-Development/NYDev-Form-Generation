import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import Organization from "../models/Organization.js";

const configurePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || "";
          let user = await User.findOne({ email });

          if (!user) {
            let organization = await Organization.findOne({ slug: "real-worship-ministry" });
            if (!organization) {
              organization = await Organization.create({
                name: "Real Worship Ministry",
                slug: "real-worship-ministry",
                plan: "free"
              });
            }

            user = await User.create({
              name: profile.displayName || "NYDev User",
              email,
              role: "org_admin",
              organization: organization._id
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

export default configurePassport;
