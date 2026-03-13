import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalKey({ vehicleName }) {
    const [isLocked, setIsLocked] = useState(true);
    const [action, setAction] = useState(null);

    const handleAction = (type) => {
        setAction(type);
        if (type === 'lock') setIsLocked(true);
        if (type === 'unlock') setIsLocked(false);
        setTimeout(() => setAction(null), 2000);
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col items-center">
            <div className="text-center mb-8">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Connected Vehicle</span>
                <h3 className="text-2xl font-black tracking-tighter text-white mt-1 uppercase">{vehicleName}</h3>
            </div>

            {/* Key Fob UI */}
            <div className="relative w-64 h-96 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] rounded-[48px] border border-white/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                
                {/* Lock/Unlock Main */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAction(isLocked ? 'unlock' : 'lock')}
                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
                            isLocked ? 'bg-white/5 text-gray-500' : 'bg-blue-600 text-white shadow-blue-500/40'
                        }`}
                    >
                        {isLocked ? (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                        )}
                    </motion.button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {isLocked ? 'Vehicle Locked' : 'Vehicle Unlocked'}
                    </span>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAction('trunk')}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-3xl border border-white/5 flex flex-col items-center gap-2 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Trunk</span>
                    </motion.button>
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAction('panic')}
                        className="bg-red-500/5 hover:bg-red-500/10 p-4 rounded-3xl border border-red-500/10 flex flex-col items-center gap-2 transition-colors"
                    >
                        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-red-400">Panic</span>
                    </motion.button>
                </div>

                {/* Status Feedback */}
                <div className="h-8 flex items-center justify-center">
                    <AnimatePresence>
                        {action && (
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-[10px] text-blue-400 font-bold uppercase tracking-widest"
                            >
                                {action === 'unlock' ? 'Sending Signal...' : action === 'lock' ? 'Securing...' : `${action} active`}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest font-medium">Bluetooth Connected</p>
        </div>
    );
}
