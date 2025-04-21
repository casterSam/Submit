import Ticket from "../models/ticket.model.js";
import Customer from "../models/customer.model.js";
import mongoose from "mongoose";

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ 
        success: false,
        error: "Title and description are required" 
      });
    }

    const ticket = await Ticket.create({ 
      title, 
      description,
      status: "pending"
    });
    
    res.status(201).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 }).lean();
    // Explicitly map to ensure proper ID format
    const response = tickets.map(ticket => ({
      ...ticket,
      id: ticket._id.toString() // Explicit conversion
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID format"
      });
    }

    const ticket = await Ticket.findById(id);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve ticket",
      error: error.message
    });
  }
};

// Update ticket status (used for closing tickets)
export const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID format"
      });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status: "closed" },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the ticket",
      error: error.message
    });
  }
};

// Delete ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    await Customer.findByIdAndUpdate(ticket.customer, {
      $pull: { orders: id },
    });

    await Ticket.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the ticket",
      error: error.message,
    });
  }
};
