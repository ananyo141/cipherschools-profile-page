import { NextFunction } from "express";
import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

// Type definitions for typescript
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;

  // user details
  aboutMe: string;
  followers: [UserDocument];
  facebookId: string;
  twitterId: string;
  instagramId: string;
  linkedinId: string;
  githubId: string;
  website: string;
  highestEducation: string;
  currentWork: string;
  interests: string;

  role: string;
  comparePassword: (
    candidatePassword: string,
    next: NextFunction
  ) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {
  paginate: CallableFunction;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  // user details
  aboutMe: {
    type: String,
    maxlength: [500, "About me cannot be more than 500 characters"],
    default: null,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  facebookId: { type: String, default: null },
  twitterId: { type: String, default: null },
  instagramId: { type: String, default: null },
  linkedinId: { type: String, default: null },
  githubId: { type: String, default: null },
  website: { type: String, default: null },
  highestEducation: {
    type: String,
    enum: ["none", "highschool", "bachelors", "masters", "phd"],
    default: "none",
  },
  currentWork: {
    type: String,
    enum: ["none", "schooling", "college", "teaching", "job", "freelancing"],
    default: "none",
  },
  interests: {
    type: [String],
    enum: [
      "none",
      "app",
      "web",
      "game",
      "dsa",
      "programming",
      "machine learning",
      "data science",
      "others",
    ],
    default: ["none"],
  },

  // user permissions
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Save hashed passwords to database
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});

// utility function to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  next: NextFunction
) {
  return await bcrypt.compare(candidatePassword, this.password).catch(next);
};

userSchema.plugin(paginate);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
export default User;
