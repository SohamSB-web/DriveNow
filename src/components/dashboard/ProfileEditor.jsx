import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileEditor({ user, onSave }) {
    const [firstName, setFirstName] = useState(user.FirstName);
    const [lastName, setLastName] = useState(user.LastName);
    const [email, setEmail] = useState(user.Email);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 lg:p-12"
        >
            <div className="flex flex-col md:flex-row gap-12">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-500/20">
                        {firstName[0]}{lastName[0]}
                    </div>
                    <button className="text-xs font-bold tracking-widest uppercase text-blue-400 hover:text-blue-300 transition-colors">
                        Change Photo
                    </button>
                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest leading-relaxed">
                        JPG or PNG. Max 5MB.
                    </p>
                </div>

                {/* Form Section */}
                <div className="flex-1 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">First Name</label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all text-white" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Last Name</label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all text-white" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all text-white" 
                        />
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button 
                            onClick={() => onSave({ FirstName: firstName, LastName: lastName, Email: email })}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all shadow-lg shadow-blue-500/20"
                        >
                            Save Changes
                        </button>
                        <button className="px-8 border border-white/10 hover:bg-white/5 text-white py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
