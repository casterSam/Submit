import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus
} from "../controllers/ticket.controller.js";

const router = express.Router();

// Correct order - specific routes AFTER general ones
router.get("/", getAllTickets);          // GET /api/tickets
router.post("/", createTicket);          // POST /api/tickets
router.get("/:id", getTicketById);       // GET /api/tickets/:id
router.patch("/:id/close", updateTicketStatus); // PATCH /api/tickets/:id/close

export default router;