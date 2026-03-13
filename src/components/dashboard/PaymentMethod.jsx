export default function PaymentMethod({ card, variant = 'card' }) {
    if (variant === 'add') {
        return (
            <button className="border-2 border-dashed border-white/10 rounded-3xl p-6 h-48 flex flex-col items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all gap-2">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="text-xl">+</span>
                </div>
                <span className="text-sm font-medium text-gray-400">Add New Card</span>
            </button>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 h-48 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <div className="flex justify-between items-start">
                <span className="text-lg font-bold">{card.type || 'Visa'}</span>
                <div className="w-10 h-6 bg-yellow-500/20 rounded" />
            </div>
            <div>
                <p className="text-white/60 text-xs mb-1">Card Holder</p>
                <p className="font-bold tracking-widest text-lg uppercase">{card.holder || 'ALEX CARTER'}</p>
            </div>
            <div className="flex justify-between items-end">
                <p className="font-mono tracking-[0.2em]">{card.number || '•••• •••• •••• 4242'}</p>
                <p className="text-sm font-bold">{card.expiry || '12/26'}</p>
            </div>
        </div>
    );
}
