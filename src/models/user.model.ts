import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  avatar: string;
  role: "admin" | "service" | "client";
  verifyCode: string;
  verifyCodeExpiry: Date;
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email address is required"],
    match: [
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email ID",
    ],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9._-]{3,20}$/, "Invalid Username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["admin", "service", "client"],
    required: [true, "Role is required"],
  },
  avatar: {
    type: String,
    required: [true, "Avatar is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Avatar is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Code expiry is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
