import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

urlSchema.index({ hash: 1 }, { unique: true });

const Url = mongoose.model("Url", urlSchema);

export default Url;
