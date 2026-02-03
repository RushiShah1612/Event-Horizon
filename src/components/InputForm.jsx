import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Calendar, FileText, PartyPopper, Zap, TreePine, Gift, X, Gamepad2, Heart, Plane, Trophy, BookOpen } from 'lucide-react';

const InputForm = ({ onStart, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetDate: '',
    bio: '',
    type: 'party'
  });
  const [error, setError] = useState('');

  const themes = [
    { value: 'party', label: 'Party 🎉', icon: <PartyPopper size={18} /> },
    { value: 'launch', label: 'Launch 🚀', icon: <Zap size={18} /> },
    { value: 'holiday', label: 'Holiday 🎄', icon: <Gift size={18} /> },
    { value: 'nature', label: 'Nature 🌿', icon: <TreePine size={18} /> },
    { value: 'gaming', label: 'Gaming 🎮', icon: <Gamepad2 size={18} /> },
    { value: 'wedding', label: 'Wedding 💍', icon: <Heart size={18} /> },
    { value: 'travel', label: 'Travel ✈️', icon: <Plane size={18} /> },
    { value: 'sport', label: 'Sport 🏆', icon: <Trophy size={18} /> },
    { value: 'study', label: 'Study 📚', icon: <BookOpen size={18} /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetDate) {
      setError('Details missing! 🛑');
      return;
    }
    if (new Date(formData.targetDate) <= new Date()) {
      setError('Future dates only! ⏳');
      return;
    }
    // Transform date to ISO string to ensure consistency in preservation
    onStart({ ...formData });
  };

  const currentTheme = themes.find(t => t.value === formData.type) || themes[0];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="input-page"
      style={{ margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>New Event</h2>
        <button onClick={onCancel} style={{ width: 'auto', background: 'transparent', padding: '0.5rem' }}>
          <X size={24} color="#888" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Event Name</label>
          <div style={{ position: 'relative' }}>
            <div className="input-icon">
              {currentTheme.icon}
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Big Day"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="type">Event Type</label>
          <div style={{ position: 'relative' }}>
            <div className="input-icon" style={{ zIndex: 1 }}>
              <motion.div key={formData.type} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                {currentTheme.icon}
              </motion.div>
            </div>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{ paddingLeft: '3rem' }}
            >
              {themes.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="targetDate">Date & Time</label>
          <div style={{ position: 'relative' }}>
            <Calendar className="input-icon" size={20} />
            <input
              type="datetime-local"
              id="targetDate"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="bio">Notes (Optional)</label>
          <div style={{ position: 'relative' }}>
            <FileText className="input-icon" size={20} style={{ top: '1.5rem', transform: 'none' }} />
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="What's the plan?"
              rows="2"
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ color: '#e94560', marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Countdown {currentTheme.icon}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default InputForm;
