import { Subjects } from "../base/subjects";
import { LEvent } from "../base/base-listener";

export interface UserConnectedEvent extends LEvent {
  subject: Subjects.UserConnected;
  data: {
    uid: string;
    email: string;
    version: number;
  };
}
