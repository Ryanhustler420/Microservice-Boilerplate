import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@project-abcd/common";

import { indexBaseRouter } from "./routes/index";
import { createBaseRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(createBaseRouter);
app.use(indexBaseRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
