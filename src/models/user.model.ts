import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  avatar: string;
  role: "admin" | "service" | "client";
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  contact: number;
  rating: number;
  enterpriseName: string;
  createdAt: Date;
}

export interface ServiceRequest extends Document {
  title: string; //title highlighting the issue
  media: string; //cloudinary url
  description: string; //problem description
  status: string;
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
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
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "service", "client"],
      required: [true, "Role is required"],
      default: "client",
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
    verifyCode: {
      type: String,
      required: [true, "VerifyCode is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Code expiry is required"],
    },
    contact: {
      type: Number,
      match: [/^[0-9]{10}$/, "Invalid contact number"],
      validate: {
        validator: (phone: number) => {
          return phone.toString().length === 10;
        },
        message: "Contact must be exactly 10 digits long",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      // required: [true, "Rating is required"],
    },
    enterpriseName: {
      //for the mechanic
      type: String,
      maxlength: [40, "Too long"],
    },
  },
  { timestamps: true }
);

const ServiceRequestSchema: Schema<ServiceRequest> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Service requirement/Title is required"],
      minlength: [4, "Title should be minimum 4 characters long"],
    },
    media: {
      type: String,
    },
    description: {
      type: String,
      minlength: [10, "Description should be atleast 10 characters long"],
      maxlength: [200, "Description can't exceed 200 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models?.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

const ServiceRequestModel =
  (mongoose.models?.ServiceRequest as mongoose.Model<ServiceRequest>) ||
  mongoose.model<ServiceRequest>("ServiceRequest", ServiceRequestSchema);

export { UserModel, ServiceRequestModel };
