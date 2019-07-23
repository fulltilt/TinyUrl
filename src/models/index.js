import mongoose from "mongoose";

import User from "./user";
import Photo from "./photo";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

const models = { User, Photo };

export { connectDb };

export default models;
