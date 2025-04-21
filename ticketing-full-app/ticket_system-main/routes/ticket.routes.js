import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus
} from "../controllers/ticket.controller.js";

const router = express.Router();

// Define specific routes before general ones
router.get("/:id", getTicketById);       // GET /api/tickets/:id
router.patch("/:id/close", updateTicketStatus); // PATCH /api/tickets/:id/close
router.get("/", getAllTickets);          // GET /api/tickets
router.post("/", createTicket);          // POST /api/tickets

export default router;
