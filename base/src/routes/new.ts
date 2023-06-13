import { requireAuth, validateRequest } from "@project-abcd/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/base",
  requireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    res.status(201).send(req.body);
  }
);

export { router as createBaseRouter };
