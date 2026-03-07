import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authThunks";
import { useNavigate, Link } from "react-router-dom";

const LOCATION = ["hyderabad", "noida", "pune", "chennai", "bengaluru"];
const COURSE_TYPE = ["mern", "java", "da"];
const BATCHES = ["OBH_1", "OBH_2", "OBH_3"];

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    phoneNumber: "", profilePicture: "", batch: "", location: "", courseType: "",
  });

  const [focused, setFocused] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "password") {
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;
      setPasswordStrength(score);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(form));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated]);

  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  const inputStyle = (name) => ({
    width: "100%",
    background: focused === name ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.04)",
    border: focused === name ? "1.5px solid rgba(59,130,246,0.55)" : "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#1e293b",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
    // background: focused === name ? "#fff" : "#f8fafc",
  });

  const selectStyle = (name) => ({
    ...inputStyle(name),
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
    cursor: "pointer",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .signup-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed 0%, #eff6ff 60%, #fff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          position: relative;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.22;
          animation: drift 9s ease-in-out infinite alternate;
        }
        .orb-1 { width: 380px; height: 380px; background: radial-gradient(circle, #f97316, transparent); top: -100px; left: -80px; animation-delay: 0s; }
        .orb-2 { width: 280px; height: 280px; background: radial-gradient(circle, #3b82f6, transparent); bottom: -60px; right: -40px; animation-delay: -4s; }
        .orb-3 { width: 200px; height: 200px; background: radial-gradient(circle, #fb923c, transparent); top: 40%; right: 10%; animation-delay: -2s; }

        @keyframes drift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(24px, 18px) scale(1.07); }
        }

        .signup-card {
          position: relative;
          width: 100%;
          max-width: 500px;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 28px;
          padding: 44px 40px 36px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 2px 0 1px rgba(251,146,60,0.08) inset,
            0 24px 72px rgba(0,0,0,0.10),
            0 0 0 1px rgba(249,115,22,0.08);
          animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .brand-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(249,115,22,0.3);
        }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #f97316;
          letter-spacing: 0.06em;
        }

        .signup-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 28px;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.15;
        }
        .signup-sub {
          font-size: 14px;
          color: #94a3b8;
          font-weight: 300;
          margin-bottom: 28px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 7px;
        }

        .btn-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(249,115,22,0.28);
          margin-top: 4px;
        }
        .btn-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(249,115,22,0.36);
        }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-box {
          display: flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.22);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #ef4444;
          margin-bottom: 16px;
        }

        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 20px 0 16px;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(0,0,0,0.08); }
        .divider-text { font-size: 12px; color: #94a3b8; }

        .signin-row {
          text-align: center;
          font-size: 14px;
          color: #94a3b8;
        }
        .signin-link {
          color: #3b82f6;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }
        .signin-link:hover { color: #f97316; }

        .section-divider {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #f97316;
          margin: 20px 0 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-divider::before, .section-divider::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(249,115,22,0.2), transparent);
        }
        .section-divider::after {
          background: linear-gradient(to left, rgba(249,115,22,0.2), transparent);
        }
      `}</style>

      <div className="signup-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="signup-card">

          {/* Brand */}
          <div className="brand-row">
            <div className="brand-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V14H2V6L8 2Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="brand-name">Accio Connect</span>
          </div>

          <h1 className="signup-heading">Create account</h1>
          <p className="signup-sub">Join your batch and start learning</p>

          <form onSubmit={submitHandler}>

            {/* Personal Info */}
            <div className="section-divider">Personal Info</div>

            {/* Name Row */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
              <div style={{ flex: 1 }}>
                <label className="field-label">First Name</label>
                <input
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocused("firstName")}
                  onBlur={() => setFocused("")}
                  required
                  style={inputStyle("firstName")}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label">Last Name</label>
                <input
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocused("lastName")}
                  onBlur={() => setFocused("")}
                  style={inputStyle("lastName")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "14px" }}>
              <label className="field-label">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
                style={inputStyle("email")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "6px" }}>
              <label className="field-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
                style={inputStyle("password")}
              />
              {form.password && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{
                        flex: 1, height: "3px", borderRadius: "99px",
                        background: i < passwordStrength ? strengthColors[passwordStrength - 1] : "#e2e8f0",
                        transition: "background 0.3s",
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "11px", color: passwordStrength > 0 ? strengthColors[passwordStrength - 1] : "#94a3b8", fontWeight: 500 }}>
                    {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "14px", marginTop: "14px" }}>
              <label className="field-label">Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="+91 98765 43210"
                value={form.phoneNumber}
                onChange={handleChange}
                onFocus={() => setFocused("phoneNumber")}
                onBlur={() => setFocused("")}
                required
                style={inputStyle("phoneNumber")}
              />
            </div>

            {/* Profile Picture */}
            <div style={{ marginBottom: "14px" }}>
              <label className="field-label">Profile Picture URL</label>
              <input
                name="profilePicture"
                placeholder="https://..."
                value={form.profilePicture}
                onChange={handleChange}
                onFocus={() => setFocused("profilePicture")}
                onBlur={() => setFocused("")}
                style={inputStyle("profilePicture")}
              />
            </div>

            {/* Batch Info */}
            <div className="section-divider">Batch Info</div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
              {/* Batch */}
              <div style={{ flex: 1 }}>
                <label className="field-label">Batch</label>
                <select
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  onFocus={() => setFocused("batch")}
                  onBlur={() => setFocused("")}
                  required
                  style={selectStyle("batch")}
                >
                  <option value="">Select</option>
                  {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Course Type */}
              <div style={{ flex: 1 }}>
                <label className="field-label">Course Type</label>
                <select
                  name="courseType"
                  value={form.courseType}
                  onChange={handleChange}
                  onFocus={() => setFocused("courseType")}
                  onBlur={() => setFocused("")}
                  required
                  style={selectStyle("courseType")}
                >
                  <option value="">Select</option>
                  {COURSE_TYPE.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Location */}
            <div style={{ marginBottom: "20px" }}>
              <label className="field-label">Location</label>
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
                onFocus={() => setFocused("location")}
                onBlur={() => setFocused("")}
                required
                style={selectStyle("location")}
              >
                <option value="">Select your city</option>
                {LOCATION.map(l => (
                  <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Error */}
            {error && (
              <div className="error-box">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="#ef4444" />
                  <path d="M7 4v3.5M7 9.5v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? <><span className="spinner" />Creating account...</> : "Create Account →"}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">already a member?</span>
            <div className="divider-line" />
          </div>

          <div className="signin-row">
            Have an account?{" "}
            <Link to="/signin" className="signin-link">Sign in</Link>
          </div>

        </div>
      </div>
    </>
  );
}