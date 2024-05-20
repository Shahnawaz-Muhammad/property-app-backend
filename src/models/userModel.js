import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse:true
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    // avatar: {type: String, required: true},
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

//middleware
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//JSON web token
UserSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//compare password
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const userModel = mongoose.model("User", UserSchema);

export default userModel;
