import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

userSchema.pre("remove", function(next) {
  this.model("Photo").deleteMany({ user: this._id }, next);
});

const User = mongoose.model("User", userSchema);

export default User;
