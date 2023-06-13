import { Listener, Subjects, UserRegisteredEvent } from "@project-abcd/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
  queueGroupName: string = queueGroupName;

  async onMessage(data: UserRegisteredEvent["data"], msg: Message) {
    // update the user record
    // publish anothor message
    msg.ack();
  }
}
