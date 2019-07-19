import mongoose from "mongoose";

import User from "./user";
import Url from "./url";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

const models = { User, Url };

export { connectDb };

export default models;
