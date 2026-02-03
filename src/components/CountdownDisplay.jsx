import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Clock, Hourglass, Calendar, Zap, Trash2, PartyPopper, Gift, TreePine, Gamepad2, Heart, Plane, Trophy, BookOpen } from 'lucide-react';

const CountdownDisplay = ({ eventData, onDelete }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const target = new Date(eventData.targetDate).getTime();

        const calculate = () => {
            const now = new Date().getTime();
            const diff = target - now;

            if (diff <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            return {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            };
        };

        const initial = calculate();
        setTimeLeft(initial);

        if (initial.days === 0 && initial.hours === 0 && initial.minutes === 0 && initial.seconds === 0) {
            if (!isTimeUp) {
                setIsTimeUp(true);
                triggerAnimation(eventData.type);
            }
        }

        const interval = setInterval(() => {
            const t = calculate();
            setTimeLeft(t);
            if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
                clearInterval(interval);
                if (!isTimeUp) {
                    setIsTimeUp(true);
                    triggerAnimation(eventData.type);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [eventData.targetDate, eventData.type]);

    const triggerAnimation = (type) => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        if (type === 'party') {
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ ...defaults, particleCount: 50, origin: { x: Math.random(), y: Math.random() - 0.2 } });
            }, 250);

        } else if (type === 'launch') {
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ particleCount: 10, startVelocity: 45, spread: 10, origin: { x: 0.5, y: 1 }, colors: ['#00f3ff', '#bd00ff'], gravity: 2, scalar: 1.2, drift: 0 });
            }, 100);

        } else if (type === 'holiday') {
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ particleCount: 5, startVelocity: 0, ticks: 300, origin: { x: Math.random(), y: 0 }, colors: ['#ffffff', '#ff0000', '#00ff00'], shapes: ['circle'], gravity: 0.6, scalar: 0.8, drift: (Math.random() - 0.5) * 2 });
            }, 200);

        } else if (type === 'nature') {
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ particleCount: 2, startVelocity: 5, ticks: 200, origin: { x: Math.random(), y: 0 }, colors: ['#4eff7b', '#228b22', '#f0e68c'], shapes: ['square'], gravity: 0.4, scalar: 1, drift: (Math.random() - 0.5) * 3 });
            }, 300);

        } else if (type === 'gaming') {
            // Pixel Rain / Glitch
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ particleCount: 10, spread: 90, origin: { y: 0.6 }, colors: ['#39ff14', '#d946ef', '#000000'], shapes: ['square'], scalar: 0.6, gravity: 0.8 });
            }, 100);

        } else if (type === 'wedding') {
            // Elegant Gold/Pink drift
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ particleCount: 5, startVelocity: 15, spread: 360, ticks: 100, origin: { x: 0.5, y: 0.5 }, colors: ['#d4af37', '#ff69b4', '#fff'], shapes: ['circle', 'heart'], scalar: 1.2, gravity: 0.5 });
            }, 300);

        } else if (type === 'travel') {
            // Sky Blue burst
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.7 }, colors: ['#00bcd4', '#ffeb3b', '#ffffff'] });

        } else if (type === 'sport') {
            // Energetic Burst
            confetti({ particleCount: 200, spread: 120, origin: { y: 0.8 }, colors: ['#ff4500', '#00bfff'], startVelocity: 55 });

        } else if (type === 'study') {
            // Calm blue confetti, very slow
            const interval = setInterval(() => {
                if (Date.now() > animationEnd) return clearInterval(interval);
                confetti({ particleCount: 3, startVelocity: 0, ticks: 50, origin: { x: Math.random(), y: 0 }, colors: ['#3b82f6', '#64748b'], shapes: ['circle'], gravity: 0.3, scalar: 0.8 });
            }, 500);
        }
    };

    const units = [
        { label: 'd', value: timeLeft.days, icon: <Calendar size={12} /> },
        { label: 'h', value: timeLeft.hours, icon: <Clock size={12} /> },
        { label: 'm', value: timeLeft.minutes, icon: <Hourglass size={12} /> },
        { label: 's', value: timeLeft.seconds, icon: <Zap size={12} /> }
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'launch': return '🚀';
            case 'holiday': return '🎄';
            case 'nature': return '🌿';
            case 'gaming': return '🎮';
            case 'wedding': return '💍';
            case 'travel': return '✈️';
            case 'sport': return '🏆';
            case 'study': return '📚';
            default: return '🎉';
        }
    };

    return (
        <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className={`event-card theme-${eventData.type || 'party'}`}
        >
            <div className="card-header">
                <span className="card-icon">{getIcon(eventData.type)}</span>
                <h2 className="card-title">{eventData.name}</h2>
                {eventData.bio && <p className="card-bio">{eventData.bio}</p>}
            </div>

            {isTimeUp ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Completed!</h3>
                </div>
            ) : (
                <div className="card-grid">
                    {units.map((u) => (
                        <div key={u.label} className="grid-item">
                            <div className="grid-val">{u.value}</div>
                            <div className="grid-label">{u.icon} {u.label}</div>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={onDelete}
                className="btn-delete"
                title="Delete Event"
            >
                <Trash2 size={16} />
            </button>
        </motion.div>
    );
};

export default CountdownDisplay;
