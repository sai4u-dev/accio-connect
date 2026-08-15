import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authThunks";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((s) => s.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        dispatch(signin(form));
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .signin-root{
          font-family:'DM Sans',sans-serif;
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(135deg,#fff7ed 0%,#eff6ff 60%,#ffffff 100%);
          overflow:hidden;
          position:relative;
          padding:20px;
        }

        .orb{
          position:absolute;
          border-radius:50%;
          filter:blur(80px);
          opacity:.22;
          animation:drift 8s ease-in-out infinite alternate;
          pointer-events:none;
        }

        .orb-1{
          width:380px;
          height:380px;
          background:radial-gradient(circle,#f97316,transparent);
          top:-100px;
          left:-80px;
        }

        .orb-2{
          width:300px;
          height:300px;
          background:radial-gradient(circle,#3b82f6,transparent);
          bottom:-60px;
          right:-60px;
          animation-delay:-4s;
        }

        .orb-3{
          width:220px;
          height:220px;
          background:radial-gradient(circle,#fb923c,transparent);
          top:45%;
          right:12%;
          animation-delay:-2s;
        }

        @keyframes drift{
          from{
            transform:translate(0,0) scale(1);
          }
          to{
            transform:translate(25px,20px) scale(1.08);
          }
        }

        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(30px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .signin-card{
          width:100%;
          max-width:420px;
          background:rgba(255,255,255,.88);
          backdrop-filter:blur(18px);
          border:1px solid rgba(255,255,255,.9);
          border-radius:28px;
          padding:44px 38px;
          box-shadow:
            0 24px 70px rgba(0,0,0,.10),
            0 0 0 1px rgba(249,115,22,.08);
          animation:fadeUp .6s cubic-bezier(.22,1,.36,1);
        }

        .brand{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:28px;
        }

        .brand-icon{
          width:32px;
          height:32px;
          border-radius:8px;
          background:linear-gradient(135deg,#f97316,#fb923c);
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          font-weight:bold;
          box-shadow:0 4px 12px rgba(249,115,22,.3);
        }

        .brand-name{
          font-family:'Syne',sans-serif;
          font-weight:800;
          color:#f97316;
          letter-spacing:.05em;
        }

        .title{
          font-family:'Syne',sans-serif;
          font-size:30px;
          color:#0f172a;
          margin-bottom:6px;
        }

        .subtitle{
          color:#64748b;
          margin-bottom:30px;
          font-size:14px;
        }

        .label{
          display:block;
          margin-bottom:7px;
          font-size:11px;
          font-weight:600;
          color:#64748b;
          text-transform:uppercase;
          letter-spacing:.08em;
        }

        .input{
          width:100%;
          background:#f8fafc;
          border:1px solid #e2e8f0;
          border-radius:12px;
          padding:13px 15px;
          font-size:15px;
          color:#1e293b;
          outline:none;
          transition:.25s;
          box-sizing:border-box;
        }

        .input:focus{
          background:#fff;
          border-color:#3b82f6;
          box-shadow:0 0 0 4px rgba(59,130,246,.12);
        }

        .button{
          width:100%;
          margin-top:8px;
          padding:14px;
          border:none;
          border-radius:12px;
          background:linear-gradient(135deg,#f97316,#3b82f6);
          color:white;
          font-family:'Syne',sans-serif;
          font-size:15px;
          font-weight:700;
          cursor:pointer;
          transition:.2s;
          box-shadow:0 6px 22px rgba(249,115,22,.25);
        }

        .button:hover:not(:disabled){
          transform:translateY(-1px);
          opacity:.95;
        }

        .button:disabled{
          opacity:.6;
          cursor:not-allowed;
        }

        .spinner{
          display:inline-block;
          width:15px;
          height:15px;
          border:2px solid rgba(255,255,255,.35);
          border-top:2px solid white;
          border-radius:50%;
          animation:spin .7s linear infinite;
          margin-right:8px;
          vertical-align:middle;
        }

        @keyframes spin{
          to{
            transform:rotate(360deg);
          }
        }

        .error{
          margin-bottom:16px;
          background:#fee2e2;
          border:1px solid #fecaca;
          color:#dc2626;
          padding:12px;
          border-radius:10px;
          font-size:14px;
        }

        .divider{
          display:flex;
          align-items:center;
          gap:12px;
          margin:24px 0 18px;
        }

        .divider-line{
          flex:1;
          height:1px;
          background:#e2e8f0;
        }

        .divider-text{
          color:#94a3b8;
          font-size:12px;
        }

        .footer{
          text-align:center;
          color:#64748b;
          font-size:14px;
        }

        .footer a{
          color:#2563eb;
          text-decoration:none;
          font-weight:600;
          transition:.2s;
        }

        .footer a:hover{
          color:#f97316;
        }
      `}</style>

            <div className="signin-root">

                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>

                <div className="signin-card">

                    <div className="brand">
                        <div className="brand-icon">A</div>
                        <div className="brand-name">ACCIO CONNECT</div>
                    </div>

                    <h1 className="title">Welcome Back</h1>

                    <p className="subtitle">
                        Sign in to continue your learning journey.
                    </p>

                    <form onSubmit={submit}>

                        <div style={{ marginBottom: 18 }}>
                            <label className="label">
                                Email Address
                            </label>

                            <input
                                className="input"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <label className="label">
                                Password
                            </label>

                            <input
                                className="input"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {error && (
                            <div className="error">
                                {error}
                            </div>
                        )}

                        <button
                            className="button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing In...
                                </>
                            ) : (
                                "Sign In →"
                            )}
                        </button>

                    </form>

                    <div className="divider">
                        <div className="divider-line"></div>
                        <div className="divider-text">
                            new here?
                        </div>
                        <div className="divider-line"></div>
                    </div>

                    <div className="footer">
                        Don't have an account?{" "}
                        <Link to="/signup">
                            Create one
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}