import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import StatCard from '../components/dashboard/StatCard';
import { BookingCard } from '../components/dashboard/BookingCard';
import PaymentMethod from '../components/dashboard/PaymentMethod';
import VehicleCatalog from '../components/dashboard/VehicleCatalog';
import ProfileEditor from '../components/dashboard/ProfileEditor';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import DigitalKey from '../components/dashboard/DigitalKey';
import LiveMap from '../components/dashboard/LiveMap';

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
    const [user, setUser] = useState({
        FirstName: 'Alex',
        LastName: 'Carter',
        Email: 'alex@example.com',
    });
    const [activeTab, setActiveTab] = useState('Overview');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);

    const handleLogout = () => {
        window.location.href = '/login';
    };

    const navItems = ['Overview', 'My Bookings', 'Active Rental', 'Payments', 'Profile', 'Settings'];

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
                        {showCatalog ? (
                            <VehicleCatalog onBack={() => setShowCatalog(false)} />
                        ) : (
                            <>
                                {/* Stats Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                                    {STATS.map((stat, i) => (
                                        <StatCard key={i} {...stat} />
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <BookingCard variant="active" booking={ACTIVE_BOOKING} />

                                    {/* ── Recent History List ── */}
                                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold tracking-tight">Recent History</h3>
                                            <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">View All</button>
                                        </div>

                                        <div className="flex flex-col gap-4 flex-1">
                                            {BOOKING_HISTORY.map((booking) => (
                                                <BookingCard key={booking.id} variant="list" booking={booking} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
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
                                <BookingCard key={idx} booking={booking} />
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
                                <PaymentMethod card={{ holder: 'ALEX CARTER', number: '•••• •••• •••• 4242', expiry: '12/26' }} />
                                <PaymentMethod variant="add" />
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
            case 'Active Rental':
                return (
                    <motion.div
                        key="Active Rental"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <DigitalKey vehicleName={ACTIVE_BOOKING.Vehicle} />
                            <LiveMap vehicleLocation={ACTIVE_BOOKING.PickupLocation} />
                        </div>
                    </motion.div>
                );
            case 'Profile':
                return (
                    <motion.div
                        key="Profile"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                        <ProfileEditor user={user} onSave={(updatedUser) => setUser(updatedUser)} />
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
                        className="max-w-3xl space-y-12"
                    >
                        <NotificationsPanel />

                        <section>
                            <h2 className="text-2xl font-bold mb-6 tracking-tight">System Preferences</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-gray-200">Email Notifications</p>
                                        <p className="text-sm text-gray-500 font-medium">Get updates on your upcoming rentals</p>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-gray-200">Dark Mode</p>
                                        <p className="text-sm text-gray-500 font-medium">Always preferred visual style</p>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-red-500 uppercase tracking-widest text-[10px]">Danger Zone</h2>
                            <button className="w-full text-left p-6 bg-red-500/5 border border-red-500/10 rounded-[32px] hover:bg-red-500/10 transition-all group">
                                <p className="font-bold text-red-400">Change Password</p>
                                <p className="text-sm text-red-400/60 group-hover:text-red-400 font-medium">For security, change your password regularly</p>
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
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                navItems={navItems} 
                showProfileMenu={showProfileMenu} 
                setShowProfileMenu={setShowProfileMenu} 
                handleLogout={handleLogout} 
                user={user} 
            />

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
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                                {activeTab === 'Overview' ? `Welcome back, ${user.FirstName}.` : activeTab}
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm font-medium">
                                {activeTab === 'Overview' 
                                    ? "Here is what's happening with your vehicles today." 
                                    : `Manage your ${activeTab.toLowerCase()} and preferences.`}
                            </p>
                        </div>
                        {activeTab === 'Overview' && (
                            <button 
                                onClick={() => setShowCatalog(!showCatalog)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                            >
                                {showCatalog ? 'Back to Overview' : 'Book New Ride'}
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