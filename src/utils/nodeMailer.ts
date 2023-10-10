
import nodemailer from "nodemailer";
import config from "../config";

const sendOTPToUserEmail = async (
  email: string,
  otp: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.nodemailer_google_auth_user,
        pass: config.nodemailer_google_auth_pass
      }
    });

    const mailOptions = {
      from: "emonibnsalim@gmail.com",
      to: email, // Replace with the user's email
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
  } catch (error) {
    
  }
};

export default sendOTPToUserEmail;
