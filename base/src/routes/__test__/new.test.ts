import request from "supertest";
import { app } from "../../app";

it("some description", async () => {
  const response = await request(app).post("/api/base").send({});
  expect(response.status).not.toEqual(404);
});
