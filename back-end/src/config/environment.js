require("dotenv").config(); // thu vien dung process.env

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  HOST_NAME: process.env.HOST_NAME,
  PORT: process.env.PORT,
};
