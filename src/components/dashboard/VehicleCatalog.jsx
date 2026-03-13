import { motion } from 'framer-motion';

const VEHICLES = [
    {
        id: 'v1',
        name: 'BMW M4 Competition',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2630&auto=format&fit=crop',
        price: '450',
        specs: { power: '503 hp', speed: '180 mph', acceleration: '3.4s' },
        category: 'Sport'
    },
    {
        id: 'v2',
        name: 'Porsche 911 GT3',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop',
        price: '850',
        specs: { power: '502 hp', speed: '197 mph', acceleration: '3.2s' },
        category: 'Supercar'
    },
    {
        id: 'v3',
        name: 'Audi RS6 Avant',
        image: 'https://images.unsplash.com/photo-1606132381084-297f6c3eb447?q=80&w=2574&auto=format&fit=crop',
        price: '600',
        specs: { power: '591 hp', speed: '155 mph', acceleration: '3.5s' },
        category: 'Performance Wagon'
    },
    {
        id: 'v4',
        name: 'Mercedes-AMG G63',
        image: 'https://images.unsplash.com/photo-1520050206274-a1af44640c6d?q=80&w=2670&auto=format&fit=crop',
        price: '1200',
        specs: { power: '577 hp', speed: '137 mph', acceleration: '4.5s' },
        category: 'Luxury SUV'
    }
];

export default function VehicleCatalog() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Available Fleet</h2>
                <div className="flex gap-2">
                    {['All', 'Sport', 'Supercar', 'SUV'].map(filter => (
                        <button key={filter} className="px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 hover:bg-white/5 transition-colors">
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {VEHICLES.map((car, idx) => (
                    <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-500"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img 
                                src={car.image} 
                                alt={car.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                                <div>
                                    <span className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">{car.category}</span>
                                    <h3 className="text-2xl font-black tracking-tighter text-white mt-1">{car.name}</h3>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-black tracking-tighter text-white">${car.price}</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ Day</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Power</span>
                                    <span className="text-sm font-bold text-gray-200">{car.specs.power}</span>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Top Speed</span>
                                    <span className="text-sm font-bold text-gray-200">{car.specs.speed}</span>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">0-60 MPH</span>
                                    <span className="text-sm font-bold text-gray-200">{car.specs.acceleration}</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-dark-900 py-4 rounded-2xl text-sm font-black tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all duration-300">
                                Rent this Vehicle
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
