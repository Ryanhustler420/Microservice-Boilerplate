import { Server, IncomingMessage, ServerResponse } from "http";
import { Server as SocketIOServer } from "socket.io";
import { natsWrapper } from "./nats-wrapper";
import mongoose from "mongoose";
import { app } from "./app";

const websocket = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new SocketIOServer(server, { path: "/api/online/socket" });

  const nsp = io.of("/new");
  nsp.on("connection", (socket) => {
    console.log("User connected to online");

    socket.on("message", (data) => {
      nsp.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from online");
    });
  });
};

const start = async () => {
  if (!process.env.NATS_URL) throw new Error("NATS_URL must be defined");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
  if (!process.env.NATS_CLIENT_ID)
    throw new Error("NATS_CLIENT_ID must be defined");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS_CLUSTER_ID must be defined");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("Listener disconnected from NATS");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  const PORT = 3000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  websocket(server);
};

start();
