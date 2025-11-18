import { Router } from "express";
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  cancelReservation,
} from "../controller/reservationController.js";

const router = Router();

router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", cancelReservation);

export default router;
