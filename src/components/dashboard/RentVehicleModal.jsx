import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';

export default function RentVehicleModal({ car, onClose }) {
    const [days, setDays] = useState(3);
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const lenis = useLenis();

    // Lock body scroll and stop Lenis when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        lenis?.stop();
        
        return () => {
            document.body.style.overflow = 'unset';
            lenis?.start();
        };
    }, [lenis]);

    if (!car) return null;

    const basePrice = parseInt(car.price.replace(/[^0-9]/g, ''));
    const totalAmount = basePrice * days;
    const insuranceFee = 45;
    const finalTotal = totalAmount + insuranceFee;

    const handleBooking = () => {
        setIsBooking(true);
        // Simulate API call
        setTimeout(() => {
            setIsBooking(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2500);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-3xl bg-black/40"
            onClick={onClose}
        >
            {/* Ambient Multi-Layered Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-[40px] w-full max-w-5xl overflow-hidden relative shadow-[0_0_120px_rgba(0,0,0,0.8),0_0_50px_rgba(59,130,246,0.1)] flex flex-col md:flex-row h-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Side - Visuals (Static on desktop) */}
                <div className="md:w-[45%] relative h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-white/10 flex-shrink-0">
                    <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent md:hidden" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[30px] p-6 space-y-2 shadow-2xl">
                            <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">{car.category}</span>
                            <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-3">{car.name}</h2>
                            <div className="flex gap-6 pt-2 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Power</span>
                                    <span className="text-sm font-black text-white">{car.specs.power}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Speed</span>
                                    <span className="text-sm font-black text-white">{car.specs.speed}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Actions (Scrollable) */}
                <div 
                    className="flex-1 overflow-y-auto p-8 sm:p-12 relative no-scrollbar"
                    data-lenis-prevent
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-20 group"
                    >
                        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">Booking Confirmed!</h3>
                                <p className="text-gray-400 font-medium max-w-xs mx-auto">Your {car.name} will be ready at <span className="text-white font-bold">{deliveryLocation || 'your specified address'}</span>. Check your email for details.</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Booking Details</h3>
                                    <div className="space-y-6">
                                        <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-xs font-bold text-gray-400">Duration</span>
                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        onClick={() => setDays(Math.max(1, days - 1))}
                                                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white"
                                                    >–</button>
                                                    <span className="text-lg font-black text-white min-w-12 text-center">{days} Days</span>
                                                    <button 
                                                        onClick={() => setDays(days + 1)}
                                                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white"
                                                    >+</button>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-white/5 mb-4" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-400">Daily Rate</span>
                                                <span className="text-sm font-black text-white">{car.price}/day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Delivery Location</h3>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={deliveryLocation}
                                            onChange={(e) => setDeliveryLocation(e.target.value)}
                                            placeholder="Enter delivery address..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 font-medium"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-50 transition-opacity">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Price Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Rental Subtotal</span>
                                            <span className="text-white font-bold">${totalAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Premium Insurance</span>
                                            <span className="text-white font-bold">${insuranceFee}</span>
                                        </div>
                                        <div className="p-1" />
                                        <div className="flex justify-between items-end bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
                                            <div>
                                                <span className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Amount</span>
                                                <span className="text-3xl font-black text-white tracking-tighter">${finalTotal}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase pb-1">USD Included Tax</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    disabled={isBooking}
                                    onClick={handleBooking}
                                    className={`w-full py-5 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 relative overflow-hidden ${
                                        isBooking ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-[0_20px_40px_rgba(255,255,255,0.05)]'
                                    }`}
                                >
                                    {isBooking ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        'Confirm & Pay Now'
                                    )}
                                </button>
                                <p className="text-[10px] text-gray-600 font-bold text-center uppercase tracking-widest">Secure transaction powered by Stripe</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
