import React, { useState } from 'react';
import '../index.css'; // Assuming custom styles are added here

export default function TicketForm({ newTicket, setNewTicket, handleCreate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleCreate(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Ticket</h2>
        
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Title
          </label>
          <input
            className="input-field w-full"
            placeholder="Enter ticket title"
            value={newTicket.title}
            onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            className="textarea-field w-full"
            placeholder="Enter detailed description"
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            required
            disabled={isSubmitting}
            rows="5"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full transition duration-200 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
}
