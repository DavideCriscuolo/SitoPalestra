import express from "express";
import * as gymController from "./../controller/controller.js";

const router = express.Router();

router.get("/", gymController.index);

router.get("/:id", gymController.show);
router.put("/:id", gymController.update);

export default router;
