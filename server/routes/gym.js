import express from "express";
import * as gymController from "./../controller/controller.js";

const router = express.Router();

router.get("/", gymController.index);

router.get("/:email", gymController.show);

export default router;
