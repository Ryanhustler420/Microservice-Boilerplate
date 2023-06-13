import { Subjects } from "../base/subjects";
import { Event } from "../base/base-listener";

export interface UserRegisteredEvent extends Event {
  subject: Subjects.UserRegistered;
  data: {
    email: string;
    version: number;
  };
}
