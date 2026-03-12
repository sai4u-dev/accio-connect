import AsideBar from "./Sidebar";

const UserProfiles = ({ users }) => {
    return (
        <div className="bg-gray-100 min-h-screen p-6 ">
            {/* <div className="h-screen">
                <AsideBar />
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {users?.map((user) => (
                    <div
                        key={user?._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                    >
                        {/* Header */}
                        <div className="bg-sky-50 p-4 rounded-t-xl flex items-center gap-4 justify-center">
                            <img
                                src={user?.profilePicture || "/avatar.png"}
                                alt="profile"
                                className="w-14 h-14 rounded-full border-2 border-sky-200 object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {user?.firstName} {user?.lastName}
                                </h3>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 text-sm text-gray-600 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phone</span>
                                <span className="font-medium">{user?.phoneNumber}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Batch</span>
                                <span className="font-medium">{user?.batch}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Location</span>
                                <span className="font-medium">{user?.location}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Course</span>
                                <span className="font-medium">{user?.courseType}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Instructor</span>
                                <span
                                    className={`font-medium ${user?.isInstructor
                                        ? "text-sky-600"
                                        : "text-gray-600"
                                        }`}
                                >
                                    {user?.isInstructor ? "Yes" : "No"}
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 pb-4 flex justify-between items-center">
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-medium ${user?.isActive
                                    ? "bg-sky-100 text-sky-700"
                                    : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {user?.isActive ? "Active" : "Inactive"}
                            </span>

                            <button className="text-sm text-sky-600 hover:text-sky-800 font-medium">
                                View Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfiles;
