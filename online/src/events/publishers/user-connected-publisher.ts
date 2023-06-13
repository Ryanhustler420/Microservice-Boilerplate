import { Publisher, UserConnectedEvent, Subjects } from "@project-abcd/common";

export class UserConnectedPublisher extends Publisher<UserConnectedEvent> {
  subject: Subjects.UserConnected = Subjects.UserConnected;
}
