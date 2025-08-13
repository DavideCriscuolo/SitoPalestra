import express from "express";
import * as gymController from "./../controller/controller.js";
import verifyToken from "./../middleware/verifyToken.js";
import verifyAdmin from "./../middleware/verifyAdmin.js";
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, gymController.index);

router.get("/:id", gymController.show);
router.get("/user/:email", gymController.showEmail);
router.put("/:id", gymController.update);
router.post("/login", gymController.login);
router.post("/login/admin", gymController.loginAdmin);
router.get("/profile", verifyToken, gymController.profile);
router.post("/register", gymController.register);

export default router;
