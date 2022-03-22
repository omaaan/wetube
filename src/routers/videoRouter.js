import express from "express";

const videoRouter = express.Router();

const handleVideoWatch = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleVideoWatch);

export default videoRouter;
