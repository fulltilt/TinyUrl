import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
