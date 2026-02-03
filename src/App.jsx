import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import InputForm from './components/InputForm';
import CountdownDisplay from './components/CountdownDisplay';

function App() {
  const [events, setEvents] = useState(() => {
    // Load from local storage if available, else empty array
    const saved = localStorage.getItem('myEvents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('myEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = (eventData) => {
    const newEvent = { ...eventData, id: Date.now() };
    setEvents(prev => [...prev, newEvent]);
    setIsAdding(false);
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div style={{ width: '100%' }}>
      <header className="app-header">
        <h1 className="app-title">Event Horizon</h1>
        <p style={{ color: '#666' }}>{events.length} Active Countdowns</p>
      </header>

      <AnimatePresence mode='wait'>
        {isAdding ? (
          <InputForm
            key="add-form"
            onStart={addEvent}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <div key="dashboard" className="dashboard-grid">
            {/* Add New Button Card */}
            <motion.div
              className="add-card"
              onClick={() => setIsAdding(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={48} />
              <span style={{ marginTop: '1rem', fontWeight: 600 }}>Create New Event</span>
            </motion.div>

            {/* Event Cards */}
            {events.map(event => (
              <CountdownDisplay
                key={event.id}
                eventData={event}
                onDelete={() => deleteEvent(event.id)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
