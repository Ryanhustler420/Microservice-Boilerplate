import request from "supertest";
import { app } from "../app";

export const register = async () => {
  const email = "example@domain.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/register")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
