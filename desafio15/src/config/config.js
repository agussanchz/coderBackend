import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    ENV: process.env.NODE_ENV || "production",
  },
  mailing: {
    SERVICE: process.env.MAILING_SERVICE,
    USER: process.env.MAILING_USER,
    PASSWORD: process.env.MAILING_PASSWORD,
  }
};