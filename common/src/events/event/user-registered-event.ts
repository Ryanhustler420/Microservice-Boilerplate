import { Subjects } from "../base/subjects";
import { LEvent } from "../base/base-listener";

export interface UserRegisteredEvent extends LEvent {
  subject: Subjects.UserRegistered;
  data: {
    email: string;
    version: number;
  };
}
