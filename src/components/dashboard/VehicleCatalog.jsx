import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VEHICLES = [
    // --- SPORT ---
    {
        id: 's1',
        name: 'BMW M4 Competition',
        image: '/BMW_M4.avif',
        price: '450',
        specs: { power: '503 hp', speed: '180 mph', acceleration: '3.4s' },
        category: 'Sport'
    },
    {
        id: 's2',
        name: 'Mercedes-AMG C63 S',
        image: '/Mercedes-AMG C63 S.avif',
        price: '400',
        specs: { power: '503 hp', speed: '180 mph', acceleration: '3.7s' },
        category: 'Sport'
    },
    {
        id: 's3',
        name: 'Audi RS5 Coupe',
        image: '/Audi RS5 Coupe.jpg',
        price: '380',
        specs: { power: '444 hp', speed: '174 mph', acceleration: '3.8s' },
        category: 'Sport'
    },
    {
        id: 's4',
        name: 'Porsche 718 Cayman GT4',
        image: '/Porsche 718 Cayman GT4.jpg',
        price: '550',
        specs: { power: '414 hp', speed: '188 mph', acceleration: '4.2s' },
        category: 'Sport'
    },
    {
        id: 's5',
        name: 'Lexus RC F Track Edition',
        image: '/Lexus RC F Track Edition.avif',
        price: '420',
        specs: { power: '472 hp', speed: '168 mph', acceleration: '4.0s' },
        category: 'Sport'
    },
    // --- SUPERCAR ---
    {
        id: 'sc1',
        name: 'Porsche 911 GT3',
        image: '/Porsche 911 GT3.jpg',
        price: '850',
        specs: { power: '502 hp', speed: '197 mph', acceleration: '3.2s' },
        category: 'Supercar'
    },
    {
        id: 'sc2',
        name: 'Lamborghini Huracán',
        image: '/Lamborghini Huracán.webp',
        price: '1500',
        specs: { power: '631 hp', speed: '202 mph', acceleration: '2.9s' },
        category: 'Supercar'
    },
    {
        id: 'sc3',
        name: 'Ferrari F8 Tributo',
        image: '/Ferrari F8 Tributo.webp',
        price: '1800',
        specs: { power: '710 hp', speed: '211 mph', acceleration: '2.8s' },
        category: 'Supercar'
    },
    {
        id: 'sc4',
        name: 'McLaren 720S Spider',
        image: '/McLaren 720S Spider.webp',
        price: '1700',
        specs: { power: '710 hp', speed: '212 mph', acceleration: '2.8s' },
        category: 'Supercar'
    },
    {
        id: 'sc5',
        name: 'Aston Martin Vantage',
        image: '/Aston Martin Vantage.webp',
        price: '950',
        specs: { power: '503 hp', speed: '195 mph', acceleration: '3.6s' },
        category: 'Supercar'
    },
    // --- SUV ---
    {
        id: 'suv1',
        name: 'Mercedes-AMG G63',
        image: '/Mercedes-AMG G63.jpg',
        price: '1200',
        specs: { power: '577 hp', speed: '137 mph', acceleration: '4.5s' },
        category: 'SUV'
    },
    {
        id: 'suv2',
        name: 'Lamborghini Urus S',
        image: '/Lamborghini Urus S.webp',
        price: '1400',
        specs: { power: '657 hp', speed: '190 mph', acceleration: '3.5s' },
        category: 'SUV'
    },
    {
        id: 'suv3',
        name: 'BMW X5 M Competition',
        image: '/BMW X5 M Competition.webp',
        price: '800',
        specs: { power: '617 hp', speed: '177 mph', acceleration: '3.7s' },
        category: 'SUV'
    },
    {
        id: 'suv4',
        name: 'Porsche Cayenne Turbo',
        image: '/Porsche Cayenne Turbo.jpg',
        price: '900',
        specs: { power: '541 hp', speed: '177 mph', acceleration: '3.7s' },
        category: 'SUV'
    },
    {
        id: 'suv5',
        name: 'Range Rover Sport SVR',
        image: '/Range Rover Sport SVR.webp',
        price: '1100',
        specs: { power: '575 hp', speed: '176 mph', acceleration: '4.3s' },
        category: 'SUV'
    }
];

export default function VehicleCatalog({ onBack, onRentVehicle }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isChanging, setIsChanging] = useState(false);

    const handleFilterChange = (filter) => {
        if (filter === activeFilter) return;
        setIsChanging(true);
        setTimeout(() => {
            setActiveFilter(filter);
            setIsChanging(false);
        }, 600);
    };

    const filteredVehicles = activeFilter === 'All'
        ? VEHICLES
        : VEHICLES.filter(v => v.category === activeFilter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight">Available Fleet</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
                    {['All', 'Sport', 'Supercar', 'SUV'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => handleFilterChange(filter)}
                            className="relative px-6 py-2 rounded-full text-xs font-bold transition-colors duration-300 whitespace-nowrap group"
                        >
                            {activeFilter === filter && (
                                <motion.div 
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-blue-600 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 transition-colors duration-300 ${
                                activeFilter === filter ? 'text-white' : 'text-gray-400 group-hover:text-white'
                            }`}>
                                {filter}
                            </span>
                            <div className={`absolute inset-0 border rounded-full transition-colors duration-300 ${
                                activeFilter === filter ? 'border-transparent' : 'border-white/10 group-hover:border-white/20'
                            }`} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[600px] relative">
                <AnimatePresence mode="wait">
                    {isChanging ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[40px] overflow-hidden h-[500px] animate-pulse relative">
                                    <div className="h-64 bg-white/5" />
                                    <div className="p-8 space-y-6">
                                        <div className="h-12 bg-white/5 rounded-2xl w-3/4" />
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="h-20 bg-white/5 rounded-2xl" />
                                            <div className="h-20 bg-white/5 rounded-2xl" />
                                            <div className="h-20 bg-white/5 rounded-2xl" />
                                        </div>
                                        <div className="h-14 bg-white/5 rounded-2xl w-full" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }} />
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredVehicles.map((car, idx) => (
                                <motion.div
                                    key={car.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ 
                                        duration: 0.5,
                                        delay: idx * 0.05,
                                        ease: [0.23, 1, 0.32, 1]
                                    }}
                                    className="group bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:border-blue-500/30 transition-all duration-500"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-30" />
                                        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                                            <div>
                                                <span className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">{car.category}</span>
                                                <h3 className="text-xl font-black tracking-tighter text-white mt-1">{car.name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xl font-black tracking-tighter text-white">${car.price}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ Day</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="bg-white/5 rounded-2xl px-2 py-4 border border-white/5 flex flex-col items-center justify-center min-h-[80px]">
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1 whitespace-nowrap">Power</span>
                                                <span className="text-xs font-black text-gray-100 whitespace-nowrap">{car.specs.power}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl px-2 py-4 border border-white/5 flex flex-col items-center justify-center min-h-[80px]">
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1 whitespace-nowrap">Top Speed</span>
                                                <span className="text-xs font-black text-gray-100 whitespace-nowrap">{car.specs.speed}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl px-2 py-4 border border-white/5 flex flex-col items-center justify-center min-h-[80px]">
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1 whitespace-nowrap">0-60 MPH</span>
                                                <span className="text-xs font-black text-gray-100 whitespace-nowrap">{car.specs.acceleration}</span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => onRentVehicle(car)}
                                            className="w-full bg-white text-black py-4 rounded-[20px] text-xs font-black tracking-[0.2em] uppercase hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl shadow-white/5"
                                        >
                                            Rent this Vehicle
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
