import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// photoSchema.index({ hash: 1 }, { unique: true });

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
