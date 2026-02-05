import { useSelector, useDispatch } from "react-redux";
import { logout, updateProfile } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
    const { user, isAuthenticated } = useSelector((s) => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
        if (user) setFormData({ ...user });
    }, [isAuthenticated, navigate, user]);

    useEffect(() => {
        document.title = "Profile";
    }, []);

    if (!user) return null;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture" && files[0]) {
            setAvatarPreview(URL.createObjectURL(files[0]));
            setFormData({ ...formData, profilePictureFile: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = () => {
        const updateData = new FormData();
        for (let key in formData) {
            if (formData[key] !== undefined) updateData.append(key, formData[key]);
        }
        dispatch(updateProfile(updateData));
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {/* LEFT – PROFILE CARD */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 text-white">
                    <div className="flex flex-col items-center">
                        <motion.img
                            src={avatarPreview || user.profilePicture || "/default-avatar.png"}
                            alt="profile"
                            className="w-28 h-28 rounded-full border-4 border-indigo-400 object-cover"
                            whileHover={{ scale: 1.05 }}
                        />
                        <h2 className="mt-4 text-xl font-bold">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-sm text-gray-300">{user.email}</p>
                        <span className="mt-2 px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
                            Active Account
                        </span>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-3 gap-4 text-center mt-6">
                        <Stat label="Batch" value={user.batch} />
                        <Stat label="Course" value={user.courseType} />
                        <Stat label="Location" value={user.location} />
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-lg font-medium transition"
                        >
                            Edit Profile
                        </button>

                        <button
                            onClick={() => dispatch(logout())}
                            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* RIGHT – DETAILS & Sessions */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Info label="Phone Number" value={user.phoneNumber} />
                        <Info label="Email" value={user.email} />
                        <Info label="Batch" value={user.batch} />
                        <Info label="Course Type" value={user.courseType} />
                        <Info label="Location" value={user.location} />
                    </div>

                    {/* SESSION HISTORY TABLE */}
                    <div className="mt-6">
                        <h4 className="font-medium mb-2">Session History</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-800">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Login</th>
                                        <th className="px-4 py-2">Logout</th>
                                        <th className="px-4 py-2">Device</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.sessions?.map((s, i) => (
                                        <tr key={i} className="border-b hover:bg-gray-50 transition">
                                            <td className="px-4 py-2">
                                                {new Date(s.login).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                {s.logout ? new Date(s.logout).toLocaleString() : "Active"}
                                            </td>
                                            <td className="px-4 py-2">{s.device || "Unknown"}</td>
                                        </tr>
                                    )) || (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-2 text-gray-400 text-center">
                                                    No sessions yet
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* EDIT PROFILE MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                Edit Profile
                            </h3>

                            <div className="flex flex-col space-y-3">
                                {/* Avatar Upload */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={avatarPreview || user.profilePicture || "/default-avatar.png"}
                                        alt="avatar preview"
                                        className="w-24 h-24 rounded-full object-cover mb-2 border"
                                    />
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </div>

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="border rounded px-3 py-2"
                                    value={formData.firstName || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="border rounded px-3 py-2"
                                    value={formData.lastName || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    className="border rounded px-3 py-2"
                                    value={formData.phoneNumber || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    className="border rounded px-3 py-2"
                                    value={formData.location || ""}
                                    onChange={handleChange}
                                />

                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* Components */

function Stat({ label, value }) {
    return (
        <div className="bg-white/10 rounded-xl p-3 text-white">
            <p className="text-xs text-gray-300">{label}</p>
            <p className="font-semibold text-sm">{value || "-"}</p>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium text-gray-900">{value || "-"}</p>
        </div>
    );
}
