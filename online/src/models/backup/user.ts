import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import mongoose from "mongoose";

// An interface that describe the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  userId: string;
  lastSeen: string;
}

// An interface that describes the properties
// that a User Modal has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findByEvent(event: { id: string; version: number }): Promise<UserDoc | null>;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  userId: string;
  version: number;
  lastSeen: string;
  isOnline(): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      require: true,
    },
    lastSeen: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return User.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User<UserAttrs>(attrs);
};

userSchema.methods.isOnline = async function () {
  return false;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User, UserDoc };
