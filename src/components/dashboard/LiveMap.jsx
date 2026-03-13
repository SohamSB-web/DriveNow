import { motion } from 'framer-motion';

export default function LiveMap({ vehicleLocation = 'Downtown Miami', status = 'In Transit' }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-1 overflow-hidden h-[500px] relative">
            <div className="w-full h-full bg-[#0A0A0A] rounded-[28px] overflow-hidden relative">
                
                {/* Abstract Map Background (Placeholder for real map) */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:40px_40px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:100px_100px]" />
                </div>

                {/* Vehicle Marker */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative">
                        <div className="w-24 h-24 bg-blue-500/20 rounded-full animate-ping absolute -inset-8" />
                        <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-[#0A0A0A] shadow-2xl relative z-10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
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
