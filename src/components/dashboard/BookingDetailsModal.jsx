import { motion, AnimatePresence } from 'framer-motion';

export default function BookingDetailsModal({ booking, onClose }) {
    if (!booking) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/60"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-[40px] w-full max-w-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Ambient Glows */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="p-8 sm:p-12 relative z-10">
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                (booking.Status || booking.status) === 'Active' 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                                {booking.Status || booking.status}
                            </span>
                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                Booking {booking.BookingID || booking.id}
                            </span>
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                            {booking.Vehicle || booking.vehicle}
                        </h2>
                        <p className="text-gray-400 font-medium">Detailed rental summary and vehicle specifications.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Rental Details */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Rental Schedule</h4>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-1 bg-blue-500/30 rounded-full" />
                                        <div>
                                            <p className="text-sm font-bold text-white mb-0.5">Pickup</p>
                                            <p className="text-xs text-gray-400 font-medium">{booking.PickupLocation || 'Miami Beach Branch'}</p>
                                            <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">{booking.PickupDateTime || 'Oct 24, 2023 • 08:00 AM'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1 bg-blue-500/30 rounded-full" />
                                        <div>
                                            <p className="text-sm font-bold text-white mb-0.5">Return</p>
                                            <p className="text-xs text-gray-400 font-medium">{booking.DropoffLocation || 'Miami Int. Airport'}</p>
                                            <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">{booking.ReturnDateTime || 'Oct 28, 2023 • 06:00 PM'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle & Pricing Details */}
                        <div className="space-y-6">
                             <div>
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Vehicle Details</h4>
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400 font-medium">License Plate</span>
                                        <span className="text-xs font-bold text-white">{booking.LicensePlate || 'DRV-N0W'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400 font-medium">Vehicle Class</span>
                                        <span className="text-xs font-bold text-white">Performance Luxury</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Financial Summary</h4>
                                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-blue-400">Total Charged</span>
                                        <span className="text-xl font-black text-white">{booking.TotalAmount || booking.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="pt-8 border-top border-white/5 flex gap-4">
                        <button 
                            className="flex-1 bg-white text-black py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Download Invoice
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            Close Details
                        </button>
                    </footer>
                </div>
            </motion.div>
        </motion.div>
    );
}
