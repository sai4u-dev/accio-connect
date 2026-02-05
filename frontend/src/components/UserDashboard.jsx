export default function UserDashboard({ users }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-4">User Dashboard</h3>
            <div className="flex flex-col gap-3">
                {users.map((u) => (
                    <div key={u.name} className="flex justify-between items-center hover:bg-gray-50 rounded-md p-2 transition-colors">
                        <div className="flex items-center gap-3">
                            <img src={u.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="font-medium text-gray-800">{u.name}</p>
                                <p className="text-gray-500 text-sm">{u.role}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-semibold ${u.status === "Active" ? "text-green-500" : "text-red-400"}`}>
                            {u.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}