import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { UserRegisteredListener } from "./events/client/user-registered-listener";

console.clear();

const stan = nats.connect("project-abcd", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("Listener disconnected from NATS");
    process.exit();
  });

  new UserRegisteredListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
