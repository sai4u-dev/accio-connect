import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authThunks";
import { useState } from "react";
import { Link } from "react-router-dom"

export default function SignIn() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((s) => s.auth);

    const [form, setForm] = useState({ email: "", password: "" });

    const submit = (e) => {
        e.preventDefault();
        dispatch(signin(form));
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <div className="bg-white flex flex-col justify-center items-center text-center shadow rounded-2xl py-8 px-4">
                    <form onSubmit={submit} className="max-w-md mx-auto p-6 rounded px-6">
                        <h1 className="text-2xl text-sky-600 font-bold mb-2">Accio Connect</h1>
                        <h2 className="text-xl font-bold mb-4">Sign In</h2>

                        <input
                            className="w-full border p-2 mb-3 rounded-lg"
                            placeholder="Email"
                            required
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <input
                            type="password"
                            className="w-full border p-2 mb-3 rounded-lg"
                            placeholder="Password"
                            required
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        {error && <p className="text-red-500">{error}</p>}

                        <button className="w-full bg-blue-600 text-white py-2 rounded rounded-lg">
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <button className=" m-2   px-4 py-2 bg-orange-100">
                        <Link to={"/signup"}>Sign Up</Link>
                    </button>
                </div>
            </div >
        </>
    );
}
