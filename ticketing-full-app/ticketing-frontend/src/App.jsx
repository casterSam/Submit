import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import api from './api';


function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Updated fetchTickets
const fetchTickets = async () => {
  try {
    const { data } = await api.get('/api/tickets');
    setTickets(data);
  } catch (error) {
    console.error('Fetch error:', error);
  } finally {
    setIsLoading(false);
  }
};
    fetchTickets();
  }, []);

// Updated handleCreate
const handleCreate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await api.post('/api/tickets', newTicket);
    setTickets(prev => [...prev, data]);
    setNewTicket({ title: '', description: '' });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    alert(error.response?.data?.error || 'Failed to create ticket');
  }
};
  const handleSelect = async (id) => {
    try {
      const res = await fetch(`http://localhost:6500/api/tickets/${id}`);
      const data = await res.json();
      setSelectedTicket(data);
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  const handleCloseTicket = async (id) => {
    try {
      const res = await fetch(`http://localhost:6500/api/tickets/${id}/close`, {
        method: 'PATCH'
      });
      const data = await res.json();
      setTickets(tickets.map(t => t._id === id ? data : t));
      setSelectedTicket(data);
    } catch (error) {
      console.error('Error closing ticket:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Ticketing System</h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Left Column - Form and List */}
              <div className="lg:col-span-2 p-6 border-r border-gray-200">
                <TicketForm
                  newTicket={newTicket}
                  setNewTicket={setNewTicket}
                  handleCreate={handleCreate}
                />
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">All Tickets</h2>
                  <TicketList tickets={tickets} handleSelect={handleSelect} />
                </div>
              </div>
              
              {/* Right Column - Details */}
              <div className="p-6 bg-gray-50 min-h-[600px]">
                {selectedTicket ? (
                  <TicketDetails
                    ticket={selectedTicket}
                    handleCloseTicket={handleCloseTicket}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700">No Ticket Selected</h3>
                    <p className="text-gray-500 mt-1">Select a ticket from the list to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;