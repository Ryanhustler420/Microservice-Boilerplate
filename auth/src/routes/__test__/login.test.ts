import request from "supertest";
import { app } from "../../app";
import { register } from "../../test/auth-helper";

it("fails when a email that does not exits is supplied", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: "example@domain.com",
      password: "password",
    })
    .expect(400);
});

it("fails when a incorrect password is supplied", async () => {
  await register();
  await request(app)
    .post("/api/users/login")
    .send({
      email: "example@domain.com",
      password: "12345678",
    })
    .expect(400);
});

it("response with a cookie when given valid credentials", async () => {
  await register();
  const response = await request(app)
    .post("/api/users/login")
    .send({
      email: "example@domain.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
