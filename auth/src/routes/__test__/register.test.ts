import request from "supertest";
import { app } from "../../app";
import { register } from "../../test/auth-helper";

it("returns a 201 on successful register", async () => {
  await register();
});

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "exampledomain.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "example@domain.com",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "example@domain.com" })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({ password: "password" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await register();
  await request(app)
    .post("/api/users/register")
    .send({
      email: "example@domain.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful register", async () => {
  const cookie = await register();
  expect(cookie).toBeDefined();
});
