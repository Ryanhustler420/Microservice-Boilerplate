import { Subjects } from "../base/subjects";
import { LEvent } from "../base/base-listener";

export interface UserDiconnectedEvent extends LEvent {
  subject: Subjects.UserDisconnected;
  data: {
    uid: string;
    email: string;
    version: number;
  };
}
