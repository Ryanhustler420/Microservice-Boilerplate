import { UserRegisteredEvent } from "../event/user-registered-event";
import { Publisher } from "../base/base-publisher";
import { Subjects } from "../base/subjects";

export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
}
