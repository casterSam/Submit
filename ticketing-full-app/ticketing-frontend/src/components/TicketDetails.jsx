import React from 'react';
export default function TicketDetails({ ticket, handleCloseTicket }) {
  return (
    <div className="border p-4">
      <h2 className="text-xl font-semibold mb-2">Ticket Details</h2>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      {ticket.status !== 'closed' && (
        <button
          onClick={() => handleCloseTicket(ticket._id)}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
        >
          Close Ticket
        </button>
      )}
    </div>
  )
}