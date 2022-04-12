const Config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "viti",
  dialect: "mysql",
};

import dotenv from "dotenv";
dotenv.config();

const Config5 = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
};

const Confi4g = {
  HOST: "185.199.220.27",
  USER: "projec11_viti",
  PASSWORD: "U-pJtdVLG}VD",
  DB: "projec11_viti",
  dialect: "mysql",
};
const Conf5ig = {
  HOST: "185.199.220.27",
  USER: "projec11_tester",
  PASSWORD: "ReHIdRedyrGJ",
  DB: "projec11_viti",
  dialect: "mysql",
};

export default Config