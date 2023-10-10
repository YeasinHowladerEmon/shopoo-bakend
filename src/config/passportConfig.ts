import config from ".";
const googleConfig = {
  clientID: config.google_client_id,
  clientSecret: config.google_slient_secret,
  callbackURL: "/auth/google/callback"
};

export const passportConfig = {
  googleConfig
};
