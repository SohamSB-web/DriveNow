import { motion } from 'framer-motion';

export default function Sidebar({ activeTab, setActiveTab, navItems, showProfileMenu, setShowProfileMenu, handleLogout, user }) {
    return (
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
                        {user.FirstName[0]}{user.LastName[0]}
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-bold">{user.FirstName} {user.LastName}</span>
                        <span className="text-xs text-gray-500">{showProfileMenu ? 'Close Menu' : 'View Profile'}</span>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}
