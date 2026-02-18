import otpGenerator from "otp-generator";
import mongoose from "mongoose";
import mime from "mime-types";


export const connectDB = (url: string) => {
  mongoose.set("strictQuery", false);

  return mongoose.connect(url);
};

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

export const generateReferralCode = (): string => {
  // Generate 3 random lowercase letters
  const letters = Array(3)
    .fill(null)
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join("");

  // Generate 3 random numbers
  const numbers = Array(3)
    .fill(null)
    .map(() => Math.floor(Math.random() * 10))
    .join("");

  return `${letters}-${numbers}`;
};

const getOtpExpiryTime = () => {
  const expiredAtDate = new Date(new Date().getTime() + 1000 * 60 * 10); // 10 minutes
  return expiredAtDate;
};

const validateFileType = (file: any): boolean => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];
  const fileMimeType = mime.lookup(file.originalname); // Lookup MIME type by filename

  // Check if MIME type is valid and within the allowed list
  fileMimeType && allowedMimeTypes.includes(fileMimeType);

  return true;
};



export { generateOTP, getOtpExpiryTime, validateFileType };
