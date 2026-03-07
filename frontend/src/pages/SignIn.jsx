import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authThunks";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((s) => s.auth);
    const [form, setForm] = useState({ email: "", password: "" });

    const submit = (e) => {
        e.preventDefault();
        dispatch(signin(form));
    };

    return (
        <div className="font-sans min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">

            {/* Background Orbs */}
            <div
                className="absolute w-[420px] h-[420px] rounded-full blur-[90px] opacity-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle,#3b82f6,transparent)",
                    top: "-80px",
                    left: "-100px",
                    animation: "drift 8s ease-in-out infinite alternate",
                }}
            />

            <div
                className="absolute w-[300px] h-[300px] rounded-full blur-[90px] opacity-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle,#6366f1,transparent)",
                    bottom: "-60px",
                    right: "-60px",
                    animation: "drift 8s ease-in-out infinite alternate",
                    animationDelay: "-4s",
                }}
            />

            <div
                className="absolute w-[200px] h-[200px] rounded-full blur-[90px] opacity-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle,#22d3ee,transparent)",
                    top: "50%",
                    right: "20%",
                    animation: "drift 8s ease-in-out infinite alternate",
                    animationDelay: "-2s",
                }}
            />

            {/* Card */}
            <div className="relative w-[420px] bg-white/[0.035] border border-white/10 rounded-[28px] px-11 pt-12 pb-10 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.6)] animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)]">

                {/* Brand */}
                <div className="flex items-center gap-2 text-[#3b82f6] text-[13px] font-extrabold tracking-[0.18em] uppercase mb-7">
                    <span className="w-[6px] h-[6px] bg-[#3b82f6] rounded-full"></span>
                    Accio Connect
                </div>

                {/* Heading */}
                <h1 className="text-[32px] font-bold text-slate-100 leading-tight mb-1">
                    Welcome back
                </h1>

                <p className="text-sm text-white/40 mb-9 font-light">
                    Sign in to continue your session
                </p>

                <form onSubmit={submit}>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-white/40 mb-2">
                            Email address
                        </label>

                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-md text-slate-100 placeholder-white/20 outline-none focus:border-blue-500 focus:bg-blue-500/10 focus:ring-2 focus:ring-blue-500/20 transition"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-[11px] font-medium tracking-widest uppercase text-white/40 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-md text-slate-100 placeholder-white/20 outline-none focus:border-blue-500 focus:bg-blue-500/10 focus:ring-2 focus:ring-blue-500/20 transition"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-sm text-red-400 mb-4">
                            {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold tracking-wide shadow-lg hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0 transition disabled:opacity-60 disabled:cursor-not-allowed mb-5"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-[14px] h-[14px] border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-xs text-white/30">new here?</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Signup */}
                <div className="text-center text-sm text-white/40">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Create one
                    </Link>
                </div>
            </div>

            {/* Animations */}
            <style>
                {`
        @keyframes drift {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(30px,20px) scale(1.08); }
        }

        @keyframes fadeUp {
          from { opacity:0; transform: translateY(24px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}
            </style>

        </div>
    );
}