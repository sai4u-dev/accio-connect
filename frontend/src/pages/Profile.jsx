import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiGmail } from "react-icons/si";
import { BsFillPhoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"
import Posts from "./Posts";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/auth/profile", {
                withCredentials: true,
            });
            setUser(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Not authenticated");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:8000/api/auth/logout",
                {},
                { withCredentials: true }
            );
            navigate("/signin");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="p-5 flex justify-center items-center h-screen mtdr">


                <div className="flex flex-col gap-x-10 border-2 border-amber-500 px-4 py-10 rounded-xl bg-orange-300 text-white shadow-amber-900 shadow-2xl">
                    <div className="pb-8 pl-16">
                        <img className="h-30 w-30 bg-[orange] bg-center  p-px rounded-full" src={user.profilePicture} alt={user.firstName + user.lastName} />
                    </div>
                    <div className="grid gap-y-2">
                        <h1 className="text-2xl font-light absolute top-10 right-10 text-black">Welcome <span className="text-[orange] text-4xl">{user.firstName + " " + user.lastName} </span>
                            <button
                                onClick={handleLogout}
                                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                            >
                                Logout
                            </button></h1>
                        <p><b className="flex items-center gap-x-2"><SiGmail color="white" />  Email:  </b>
                            {user.email}
                        </p>
                        <p><b className="flex items-center gap-x-2">  <BsFillPhoneFill color="white" /> Phone:</b>
                            {user.phoneNumber}
                        </p>
                    </div>
                </div>
            </div>
            <Posts />
        </>

    );
};

export default Profile;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { SiGmail } from "react-icons/si";
// import { BsFillPhoneFill } from "react-icons/bs";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:8000/api/auth/profile",
//                     { withCredentials: true }
//                 );
//                 setUser(res.data.data);
//             } catch (err) {
//                 console.log(err)
//                 setError("Not authenticated");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleLogout = async () => {
//         await axios.post(
//             "http://localhost:8000/api/auth/logout",
//             {},
//             { withCredentials: true }
//         );
//         navigate("/signin");
//     };

//     if (loading) return <div className="p-10">Loading profile...</div>;
//     if (error) return <div className="p-10 text-red-500">{error}</div>;

//     return (
//         <div className="min-h-screen bg-gray-100 flex">
//             {/* Sidebar */}
//             <div className="w-64 bg-white border-r p-6">
//                 <h1 className="text-2xl font-bold text-blue-600 mb-8">Accio</h1>
//                 <ul className="space-y-4 text-gray-600">
//                     <li className="font-semibold text-blue-600">Home</li>
//                     <li>Messages</li>
//                     <li>Referral Posts</li>
//                     <li>Connections</li>
//                 </ul>

//                 <div className="flex items-center gap-3 mt-10">
//                     <img
//                         src={user.profilePicture}
//                         className="h-10 w-10 rounded-full"
//                         alt=""
//                     />
//                     <div>
//                         <p className="font-semibold">
//                             {user.firstName} {user.lastName}
//                         </p>
//                         <p className="text-sm text-green-500">Online</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Profile Section */}
//                 <div className="lg:col-span-2 space-y-6">
//                     {/* Profile Header */}
//                     <div className="bg-white rounded-xl shadow relative">
//                         <div className="h-36 bg-gradient-to-r from-gray-200 to-gray-100 rounded-t-xl" />

//                         <img
//                             src={user.profilePicture}
//                             alt="profile"
//                             className="h-28 w-28 rounded-full border-4 border-white absolute left-8 top-20"
//                         />

//                         <div className="pt-20 pb-6 px-8">
//                             <h1 className="text-2xl font-semibold">
//                                 {user.firstName} {user.lastName}
//                             </h1>
//                             <p className="text-gray-600">Software Engineer at Accio</p>
//                             <p className="text-sm text-gray-500">Bangalore, India</p>

//                             <div className="flex gap-6 mt-4 text-sm text-gray-600">
//                                 <p className="flex items-center gap-2">
//                                     <SiGmail /> {user.email}
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                     <BsFillPhoneFill /> {user.phoneNumber}
//                                 </p>
//                             </div>

//                             <button
//                                 onClick={handleLogout}
//                                 className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>

//                     {/* Post */}
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <div className="flex items-center gap-3 mb-3">
//                             <img
//                                 src={user.profilePicture}
//                                 className="h-10 w-10 rounded-full"
//                                 alt=""
//                             />
//                             <div>
//                                 <p className="font-semibold">
//                                     {user.firstName} {user.lastName}
//                                 </p>
//                                 <p className="text-sm text-gray-500">2d</p>
//                             </div>
//                         </div>

//                         <p className="mb-3">Had a great time at the conference!</p>

//                         <img
//                             src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
//                             className="rounded-lg"
//                             alt="post"
//                         />

//                         <div className="flex gap-6 text-gray-500 mt-4">
//                             <span>❤️ 238</span>
//                             <span>💬 67</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Panel */}
//                 <div className="space-y-6">
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h2 className="font-semibold mb-4">Profile Overview</h2>
//                         <div className="space-y-2 text-gray-600">
//                             <p>👥 875 Connections</p>
//                             <p>👁 124 Profile Visits</p>
//                             <p>📌 49 Referral Posts</p>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h2 className="font-semibold mb-4">Recently Placed</h2>
//                         <div className="flex items-center gap-3">
//                             <img
//                                 src={user.profilePicture}
//                                 className="h-10 w-10 rounded-full"
//                                 alt=""
//                             />
//                             <div>
//                                 <p className="font-semibold">Raj Patel</p>
//                                 <p className="text-sm text-gray-500">Data Analyst at XYZ</p>
//                                 <p className="text-xs text-green-500">5h ago</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
