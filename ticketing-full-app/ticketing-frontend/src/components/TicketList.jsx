import React from 'react';

export default function TicketList({ tickets, handleSelect }) {
  const safeTickets = Array.isArray(tickets) ? tickets : [];
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const handleTicketClick = (ticket) => {
    if (!ticket._id || typeof ticket._id !== 'string') {
      console.error('Invalid ticket ID:', ticket._id);
      return;
    }
    handleSelect(ticket._id);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Ticket List</h2>
        </div>
        
        {safeTickets.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {safeTickets.map((ticket) => (
              <li
                key={ticket._id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleTicketClick(ticket)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-medium">{ticket.title}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {ticket.description.substring(0, 80)}{ticket.description.length > 80 ? '...' : ''}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Created: {new Date(ticket.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No tickets available. Create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}