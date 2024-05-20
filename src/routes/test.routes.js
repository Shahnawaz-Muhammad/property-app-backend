import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { testPostController } from "../controllers/test.controller.js";

//router object
const router = express.Router();

//routes
router.post("/test-post", userAuth, testPostController);

//export
export default router;