import { UserRegisteredListener } from "../user-registered-listener";
import { UserRegisteredEvent } from "@project-abcd/common";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";

const setup = async () => {
  // create an instance of the listener
  const listener = new UserRegisteredListener(natsWrapper.client);

  // create a fake data event
  const data: UserRegisteredEvent["data"] = {
    email: "example@gmail.com",
    version: 0
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    data,
    msg,
  };
};

it("creates and saves a ticket", async () => {
  // const { listener, data, msg } = await setup();
  // // call the onMessage function with the data object + message object
  // await listener.onMessage(data, msg);
  // // write assertions to make a ticket was created!
  // const ticket = await Ticket.findById(data.id);

  // expect(ticket).toBeDefined();
  // expect(ticket!.title).toEqual(data.title);
  // expect(ticket!.price).toEqual(data.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make a ack function is called!
  expect(msg.ack).toHaveBeenCalled();
});
