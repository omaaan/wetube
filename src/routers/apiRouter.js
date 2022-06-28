import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/comment",
  protectorMiddleware,
  createComment
);
apiRouter.delete(
  "/videos/:id([0-9a-f]{24})/comment",
  protectorMiddleware,
  deleteComment
);

export default apiRouter;
