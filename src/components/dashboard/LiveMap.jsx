import { motion } from 'framer-motion';

export default function LiveMap({ vehicleLocation = 'Downtown Miami', status = 'In Transit' }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-1 overflow-hidden h-[500px] relative">
            <div className="w-full h-full bg-[#0A0A0A] rounded-[28px] overflow-hidden relative">
                
                {/* Live 2D Map Background */}
                <div className="absolute inset-0">
                    <img 
                        src="/live_map.png" 
                        className="w-full h-full object-cover opacity-40 mix-blend-screen" 
                        alt="Live City Map"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-60" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] opacity-40" />
                </div>

                {/* Prominent Vehicle Marker UI */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 bg-blue-500/20 rounded-full animate-ping absolute" />
                        <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-[#0A0A0A] shadow-2xl relative z-10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full" />
                    </div>
                </motion.div>

                {/* Map Overlay Info */}
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                    <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Live Tracking</span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tighter">{vehicleLocation}</h4>
                    </div>

                    <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Estimated Arrival</span>
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-tighter">12 Mins</h4>
                    </div>
                </div>

                {/* Map Controls (Fake) */}
                <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
                    <button className="w-10 h-10 bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <span className="text-xl">+</span>
                    </button>
                    <button className="w-10 h-10 bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <span className="text-xl">-</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
