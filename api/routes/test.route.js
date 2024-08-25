import express from "express";
import {
  shouldBeAdmin,
  shouldBeLoggedIn,
} from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn); // first verify token comes into the picture .. if it returns true then we proceed to the next request which is should be logged in
router.get("/should-be-admin", shouldBeAdmin);

export default router;
