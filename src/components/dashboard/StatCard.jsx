export default function StatCard({ label, value }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center">
            <span className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">{label}</span>
            <span className="text-3xl font-extrabold tracking-tighter">{value}</span>
        </div>
    );
}
