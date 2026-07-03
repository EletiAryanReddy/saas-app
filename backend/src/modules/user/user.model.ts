import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  password?: string;

  avatar?: string;

  provider: "LOCAL" | "GOOGLE" | "PHONE";

  googleId?: string;

  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST";

  workspaceIds: mongoose.Types.ObjectId[];

  isVerified: boolean;

  emailVerified: boolean;

  phoneVerified: boolean;

  otp?: string;

  otpExpires?: Date;

  refreshToken?: string;

  lastLogin?: Date;

  isActive: boolean;

  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    avatar: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE", "PHONE"],
      default: "LOCAL",
    },

    googleId: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: [
        "OWNER",
        "ADMIN",
        "MEMBER",
        "GUEST",
      ],
      default: "MEMBER",
    },

    workspaceIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpires: {
      type: Date,
      default: null,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    lastLogin: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before save
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  if (!this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

// Compare password
UserSchema.methods.comparePassword =
  async function (password: string) {
    if (!this.password) return false;

    return bcrypt.compare(
      password,
      this.password
    );
  };
export default mongoose.models.User ||
mongoose.model<IUser>(
  "User",
  UserSchema
);
