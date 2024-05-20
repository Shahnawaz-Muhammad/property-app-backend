import express from "express";

import {
  registerController,
  loginUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginUser);

export default router;
