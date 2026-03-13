import { motion } from 'framer-motion';

const NOTIFICATIONS = [
    {
        id: 'n1',
        title: 'Booking Confirmed',
        message: 'Your 2023 BMW M4 GT3 is ready for pickup.',
        time: '2 hours ago',
        type: 'success'
    },
    {
        id: 'n2',
        title: 'Payment Success',
        message: 'Payment for booking BK-9942 was successful.',
        time: '5 hours ago',
        type: 'info'
    },
    {
        id: 'n3',
        title: 'System Update',
        message: 'New car models have been added to the catalog.',
        time: '1 day ago',
        type: 'info'
    }
];

export default function NotificationsPanel() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Recent Notifications</h2>
            <div className="space-y-4">
                {NOTIFICATIONS.map((note, idx) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex gap-4 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            note.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                        }`}>
                            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm text-gray-200 group-hover:text-blue-400 transition-colors uppercase tracking-widest">{note.title}</h4>
                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{note.time}</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">{note.message}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
