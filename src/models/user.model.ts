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
  isActive: boolean;
  contact: number;
  rating: number;
  location?: {
    coordinates: [number];
    //add more if needed
  };
  createdAt: Date;
}

export interface ServiceRequest extends Document {
  location: {
    coordinates: [Number];
  };
  title: string; //title highlighting the issue
  media: string; //cloudinary url
  description: string; //problem description
  createdAt: Date;
}

export interface Notification extends Document {
  recipient: User;
  message: string;
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
    default: "client"
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
  isActive: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    // required: [true, "Rating is required"],
  },
  location: {
    coordinates: [Number],
    // required: [true, "Coordinates are required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ServiceRequestSchema: Schema<ServiceRequest> = new Schema({
  location: {
    coordinates: [Number],
    validate: {
      validator: (coords: number[]) => {
        return coords.length === 2; //check if only 2 values are passed in the coords arraym(lat, long)
      },
    },
    required: [true, "Coordinates are required"],
    //add if required
  },
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel =
  (mongoose.models?.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

const NotificationSchema: Schema<Notification> = new Schema({
  recipient: {
    type: new mongoose.Types.ObjectId(),
    ref: UserModel,
    required: [true, "Recipient is required"],
  },
  message: {
    type: String,
    default: "New Notification",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ServiceRequestModel =
  (mongoose.models?.ServiceRequest as mongoose.Model<ServiceRequest>) ||
  mongoose.model<ServiceRequest>("ServiceRequest", ServiceRequestSchema);

const NotificationModel =
  (mongoose.models?.Notification as mongoose.Model<Notification>) ||
  mongoose.model<Notification>("Notification", NotificationSchema);

export { UserModel, ServiceRequestModel, NotificationModel };