import nats from "node-nats-streaming";
import { UserRegisteredPublisher } from "./events/client/user-registered-publisher";

console.clear();

const stan = nats.connect("appname", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new UserRegisteredPublisher(stan);
  try {
    await publisher.publish({
      email: "something@gmail.com",
    });
  } catch (err) {
    console.log(err);
  }
});
