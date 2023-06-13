import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ConnectionStatus } from "@project-abcd/common";
import { UserDoc } from "../backup/user";
import mongoose from "mongoose";

interface ConnectionAttrs {
  status: ConnectionStatus;
  userId: string;
  user: UserDoc;
}

interface ConnectionDoc extends mongoose.Document {
  user: UserDoc;
  userId: string;
  status: ConnectionStatus;
  version: number;
}

interface ConnectionModel extends mongoose.Model<ConnectionDoc> {
  build(attrs: ConnectionAttrs): ConnectionDoc;
}

const connectionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: ConnectionStatus.Disconnected,
      enum: Object.values(ConnectionStatus),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
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

connectionSchema.set("versionKey", "version");
connectionSchema.plugin(updateIfCurrentPlugin);

connectionSchema.statics.build = (attrs: ConnectionAttrs) => {
  return new Connection(attrs);
};

const Connection = mongoose.model<ConnectionDoc, ConnectionModel>(
  "Connection",
  connectionSchema
);
export { Connection };
