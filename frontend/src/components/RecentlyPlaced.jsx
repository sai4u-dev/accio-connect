export default function RecentlyPlaced({ users }) {

    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-4">Recently Placed</h3>
            <div className="flex flex-col gap-3">
                {users.slice(0, 5).map((u) => (
                    <div key={u._id} className="flex justify-between items-center hover:bg-gray-50 rounded-md p-2 transition-colors">
                        <div className="flex items-center gap-3">
                            <img src={u.profilePicture} alt={u.firstName} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="font-medium text-gray-800">{u.firstName}</p>
                                <p className="text-gray-500 text-sm">{u.courseType} at {u.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
