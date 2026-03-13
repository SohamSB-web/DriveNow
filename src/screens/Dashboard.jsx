import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data based on your ER Diagram ---
const USER = {
    FirstName: 'Alex',
    LastName: 'Carter',
    Email: 'alex@example.com',
};

const STATS = [
    { label: 'Active Rentals', value: '1' },
    { label: 'Total Miles Driven', value: '1,240' },
    { label: 'Reward Points', value: '8,450' },
];

const ACTIVE_BOOKING = {
    BookingID: 'BK-9942',
    Vehicle: '2023 BMW M4 GT3',
    LicensePlate: 'DRV-N0W',
    PickupLocation: 'Miami Beach Branch',
    DropoffLocation: 'Miami Int. Airport',
    PickupDateTime: 'Oct 24, 2023 • 08:00 AM',
    ReturnDateTime: 'Oct 28, 2023 • 06:00 PM',
    TotalAmount: '$1,200',
    Status: 'Active',
};

const BOOKING_HISTORY = [
    { id: 'BK-8821', vehicle: 'Porsche 911 GT3', date: 'Sep 12, 2023', amount: '$850', status: 'Completed' },
    { id: 'BK-7643', vehicle: 'Mercedes-Benz G63', date: 'Aug 04, 2023', amount: '$1,400', status: 'Completed' },
    { id: 'BK-6512', vehicle: 'Audi RS6 Avant', date: 'Jul 18, 2023', amount: '$600', status: 'Completed' },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        window.location.href = '/login';
    };

    const navItems = ['Overview', 'My Bookings', 'Payments', 'Settings'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <motion.div
                        key="Overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            {STATS.map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center">
                                    <span className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">{stat.label}</span>
                                    <span className="text-3xl font-extrabold tracking-tighter">{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* ── Active Booking Card ── */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] p-1 overflow-hidden relative">
                                <div className="bg-[#0A0A0A] rounded-[28px] p-8 h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">{ACTIVE_BOOKING.Status} Booking</span>
                                            </div>
                                            <h2 className="text-3xl font-extrabold tracking-tight">{ACTIVE_BOOKING.Vehicle}</h2>
                                            <p className="text-gray-400 text-sm mt-1">Plate: {ACTIVE_BOOKING.LicensePlate}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold tracking-tighter">{ACTIVE_BOOKING.TotalAmount}</span>
                                            <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Total</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                            <span className="block text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Pickup</span>
                                            <span className="block font-semibold mb-1">{ACTIVE_BOOKING.PickupLocation}</span>
                                            <span className="block text-sm text-gray-400">{ACTIVE_BOOKING.PickupDateTime}</span>
                                        </div>
                                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                            <span className="block text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Dropoff</span>
                                            <span className="block font-semibold mb-1">{ACTIVE_BOOKING.DropoffLocation}</span>
                                            <span className="block text-sm text-gray-400">{ACTIVE_BOOKING.ReturnDateTime}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4 relative z-10">
                                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-2xl text-sm font-bold transition-colors">
                                            Manage Booking
                                        </button>
                                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-2xl text-sm font-bold transition-colors">
                                            View Digital Key
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* ── Recent History List ── */}
                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold tracking-tight">Recent History</h3>
                                    <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">View All</button>
                                </div>

                                <div className="flex flex-col gap-4 flex-1">
                                    {BOOKING_HISTORY.map((booking) => (
                                        <div key={booking.id} className="group p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-semibold text-sm group-hover:text-blue-400 transition-colors">{booking.vehicle}</span>
                                                <span className="font-bold text-sm">{booking.amount}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>{booking.date}</span>
                                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">{booking.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'My Bookings':
                return (
                    <motion.div
                        key="My Bookings"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold mb-4">Your Booking History</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[ACTIVE_BOOKING, ...BOOKING_HISTORY].map((booking, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{booking.Vehicle || booking.vehicle}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.Status === 'Active' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {booking.Status || booking.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4">ID: {booking.BookingID || booking.id}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">{booking.TotalAmount || booking.amount}</span>
                                        <button className="text-blue-400 text-sm font-medium hover:underline">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 'Payments':
                return (
                    <motion.div
                        key="Payments"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Saved Payment Methods</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 h-48 flex flex-col justify-between shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                                    <div className="flex justify-between items-start">
                                        <span className="text-lg font-bold">Visa</span>
                                        <div className="w-10 h-6 bg-yellow-500/20 rounded" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-xs mb-1">Card Holder</p>
                                        <p className="font-bold tracking-widest text-lg">ALEX CARTER</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <p className="font-mono tracking-[0.2em]">•••• •••• •••• 4242</p>
                                        <p className="text-sm font-bold">12/26</p>
                                    </div>
                                </div>
                                <button className="border-2 border-dashed border-white/10 rounded-3xl p-6 h-48 flex flex-col items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <span className="text-xl">+</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">Add New Card</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden overflow-x-auto">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/5">
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {BOOKING_HISTORY.map((txn, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-sm">{txn.date}</td>
                                                <td className="px-6 py-4 text-sm">{txn.vehicle} Rental</td>
                                                <td className="px-6 py-4 text-sm font-bold">{txn.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">Success</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'Settings':
                return (
                    <motion.div
                        key="Settings"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-3xl space-y-8"
                    >
                        <section>
                            <h2 className="text-xl font-bold mb-4">General Settings</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <div>
                                        <p className="font-bold">Email Notifications</p>
                                        <p className="text-sm text-gray-400">Get updates on your upcoming rentals</p>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <div>
                                        <p className="font-bold">Dark Mode</p>
                                        <p className="text-sm text-gray-400">Always preferred visual style</p>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-red-400">Security</h2>
                            <button className="w-full text-left p-4 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 transition-all group">
                                <p className="font-bold text-red-400">Change Password</p>
                                <p className="text-sm text-red-400/60 group-hover:text-red-400">For security, change your password regularly</p>
                            </button>
                        </section>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden font-sans">

            {/* ─────────── SIDEBAR ─────────── */}
            <motion.aside
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-64 border-r border-white/10 bg-[#0A0A0A]/50 backdrop-blur-xl hidden md:flex flex-col justify-between z-20"
            >
                <div>
                    {/* Brand */}
                    <div className="h-24 flex items-center px-8 border-b border-white/5">
                        <div className="text-white font-[Outfit] font-extrabold text-2xl tracking-tighter cursor-pointer">
                            Drive<span className="text-blue-500">Now.</span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="p-4 space-y-2 mt-4">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveTab(item)}
                                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === item
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* User Profile Mini */}
                <div className="p-4 border-t border-white/5 relative">
                    {/* Account Popup */}
                    {showProfileMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute bottom-full left-4 right-4 mb-2 bg-[#111111] border border-white/10 rounded-2xl p-2 shadow-2xl z-30"
                        >
                            <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 rounded-xl transition-colors">
                                Profile Settings
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 rounded-xl transition-colors">
                                Switch Account
                            </button>
                            <div className="h-px bg-white/5 my-1" />
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                            >
                                Logout
                            </button>
                        </motion.div>
                    )}

                    <div 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border ${showProfileMenu ? 'bg-white/5 border-white/10' : 'border-transparent'}`}
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                            {USER.FirstName[0]}{USER.LastName[0]}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold">{USER.FirstName} {USER.LastName}</span>
                            <span className="text-xs text-gray-500">{showProfileMenu ? 'Close Menu' : 'View Profile'}</span>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* ─────────── MAIN CONTENT ─────────── */}
            <main 
                data-lenis-prevent
                className="flex-1 relative overflow-y-auto bg-gradient-to-b from-[#0A0A0A] to-[#050505] p-2"
            >

                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 pb-32 relative z-10">

                    {/* Header */}
                    <motion.header
                        key={activeTab}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
                    >
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                {activeTab === 'Overview' ? `Welcome back, ${USER.FirstName}.` : activeTab}
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm font-medium">
                                {activeTab === 'Overview' 
                                    ? "Here is what's happening with your vehicles today." 
                                    : `Manage your ${activeTab.toLowerCase()} and preferences.`}
                            </p>
                        </div>
                        {activeTab === 'Overview' && (
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                Book New Ride
                            </button>
                        )}
                    </motion.header>

                    {/* Tab Content Wrap */}
                    <AnimatePresence mode="wait">
                        {renderTabContent()}
                    </AnimatePresence>

                </div>
            </main>
        </div>
    );
}