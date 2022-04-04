const Config2 = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "viti",
  dialect: "mysql",
};

import dotenv from "dotenv";
dotenv.config();

const Config = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
};

export default Config