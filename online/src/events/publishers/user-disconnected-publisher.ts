import {
  Publisher,
  UserDiconnectedEvent,
  Subjects,
} from "@project-abcd/common";

export class UserDisconnectedPublisher extends Publisher<UserDiconnectedEvent> {
  subject: Subjects.UserDisconnected = Subjects.UserDisconnected;
}
