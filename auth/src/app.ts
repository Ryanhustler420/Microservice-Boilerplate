import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@project-abcd/common";
import { currentUserRouter } from "./routes/current-user";
import { userRegisterRouter } from "./routes/register";
import { userLogoutRouter } from "./routes/logout";
import { userLoginRouter } from "./routes/login";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(userRegisterRouter);
app.use(userLogoutRouter);
app.use(userLoginRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };