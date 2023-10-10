import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    expires_in: process.env.JWT_EXPIRES_IN
  },
  nodemailer_google_auth_user: process.env.NODEMAILER_GOOGLE_AUTH_USER,
  nodemailer_google_auth_pass: process.env.NODEMAILER_GOOGLE_AUTH_PASS,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_slient_secret: process.env.GOOGLE_SLIENT_SECRET,
};
