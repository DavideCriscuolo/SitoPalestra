import express from "express";
import * as gymController from "./../controller/controller.js";

const router = express.Router();

router.get("/", gymController.index);

router.get("/:id", gymController.show);
router.get("/user/:email", gymController.showEmail);
router.put("/:id", gymController.update);
router.post("/validate", gymController.validate);
export default router;
