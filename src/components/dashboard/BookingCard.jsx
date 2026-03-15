import { motion } from 'framer-motion';

export function BookingCard({ booking, variant = 'grid', setActiveTab, onViewDetails }) {
    if (variant === 'active') {
        return (
            <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] p-1 overflow-hidden relative">
                <div className="bg-[#0A0A0A] rounded-[28px] p-8 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">{booking.Status} Booking</span>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight">{booking.Vehicle}</h2>
                            <p className="text-gray-400 text-sm mt-1">Plate: {booking.LicensePlate}</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl font-bold tracking-tighter">{booking.TotalAmount}</span>
                            <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Total</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                            <span className="block text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Pickup</span>
                            <span className="block font-semibold mb-1">{booking.PickupLocation}</span>
                            <span className="block text-sm text-gray-400">{booking.PickupDateTime}</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                            <span className="block text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Dropoff</span>
                            <span className="block font-semibold mb-1">{booking.DropoffLocation}</span>
                            <span className="block text-sm text-gray-400">{booking.ReturnDateTime}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4 relative z-10">
                        <button 
                            onClick={() => setActiveTab('My Bookings')}
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-2xl text-sm font-bold transition-colors"
                        >
                            Manage Booking
                        </button>
                        <button 
                            onClick={() => setActiveTab('Active Rental')}
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-2xl text-sm font-bold transition-colors"
                        >
                            View Digital Key
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'list') {
         return (
            <div 
                onClick={() => onViewDetails?.(booking)}
                className="group p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
            >
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm group-hover:text-blue-400 transition-colors">{booking.Vehicle || booking.vehicle}</span>
                    <span className="font-bold text-sm">{booking.TotalAmount || booking.amount}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{booking.PickupDateTime || booking.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">{booking.Status || booking.status}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{booking.Vehicle || booking.vehicle}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.Status === 'Active' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                    {booking.Status || booking.status}
                </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">ID: {booking.BookingID || booking.id}</p>
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{booking.TotalAmount || booking.amount}</span>
                <button 
                    onClick={() => onViewDetails?.(booking)}
                    className="text-blue-400 text-sm font-medium hover:underline"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
