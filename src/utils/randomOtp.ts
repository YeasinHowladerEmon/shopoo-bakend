function generateRandomOTP() {
  // Generate a random number between 100000 and 999999 (inclusive)
  const min = 100000;
  const max = 999999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;

  // Convert the number to a string to ensure it's exactly 6 digits
  const otpString = otp.toString();

  return otpString;
}

export default generateRandomOTP;
