import { UserRegisteredEvent } from "../event/user-registered-event";
import { Listener } from "../base/base-listener";
import { Message } from "node-nats-streaming";
import { Subjects } from "../base/subjects";

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
  queueGroupName: string = "users-service";

  onMessage(data: UserRegisteredEvent["data"], msg: Message): void {
    console.log(msg.getData());
    msg.ack();
  }
}
