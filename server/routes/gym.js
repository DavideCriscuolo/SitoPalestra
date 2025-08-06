import express from "express";
import * as gymController from "./../controller/controller.js";
import verifyToken from "./../middleware/verifyToken.js";

const router = express.Router();

router.get("/", gymController.index);

router.get("/:id", gymController.show);
router.get("/user/:email", gymController.showEmail);
router.put("/:id", gymController.update);
router.post("/login", gymController.login);
router.get("/profile", verifyToken, gymController.profile);
router.post("/register", gymController.register);

export default router;
