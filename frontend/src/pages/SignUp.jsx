import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const LOCATION = [
  "hyderabad",
  "noida",
  "pune",
  "chennai",
  "bengaluru",
];
const COURSE_TYPE = ["mern", "java", "da"];
const BATCHES = ["OBH_1", "OBH_2", "OBH_3",
]

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
    batch: "",
    location: "",
    courseType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(form));
  };

  // Redirect if signup success
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="flex gap-3 mb-3">
          <input
            className="input"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <input
          className="input mb-3"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="input mb-3"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="input mb-3"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          className="input mb-3"
          name="profilePicture"
          placeholder="Profile Image URL"
          value={form.profilePicture}
          onChange={handleChange}
        />

        <select
          className="input mb-3"
          name="batch"
          value={form.batch}
          onChange={handleChange}
          required
        >
          <option value="">Select Batch</option>
          {BATCHES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className="input mb-3"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        >
          <option value="">Select Location</option>
          {LOCATION.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          className="input mb-3"
          name="courseType"
          value={form.courseType}
          onChange={handleChange}
          required
        >
          <option value="">Select Course Type</option>
          {COURSE_TYPE.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

















/*import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

const LOCATION = ["hyderabad", "noida", "pune", "chennai", "bengaluru"];
const COURSE_TYPE = ["mern", "java", "da"];
const BATCHES = ["OBH_1", "OBH_2", "OBH_3"];

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    batch: "",
    location: "",
    courseType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "password") evaluatePassword(value);
  };

  const evaluatePassword = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setPasswordStrength(score);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(form));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  const strengthColor =
    passwordStrength <= 1
      ? "bg-red-500"
      : passwordStrength === 2
      ? "bg-yellow-400"
      : "bg-green-500";

  const FieldRow = ({ label, children, value }) => (
    <div className="flex items-center justify-between mb-6 border-b">
      <span className="text-gray-600 w-1/3">{label}</span>
      <div className="relative w-2/3">
        {children}
        {value && (
          <CheckCircle
            size={18}
            className="absolute right-0 top-2 text-green-500"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg px-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">
          AccioJob Sign Up
        </h2>

        <FieldRow label="First Name" value={form.firstName}>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full outline-none py-1"
          />
        </FieldRow>

        <FieldRow label="Second Name" value={form.lastName}>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full outline-none py-1"
          />
        </FieldRow>

        <FieldRow label="Email id" value={form.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full outline-none py-1"
          />
        </FieldRow>

        
        <div className="mb-2 border-b">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 w-1/3">Password</span>
            <div className="relative w-2/3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full outline-none py-1 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1 text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {form.password && (
                <CheckCircle
                  size={18}
                  className="absolute right-0 top-1 text-green-500"
                />
              )}
            </div>
          </div>

         
          <div className="h-1 w-full bg-gray-200 mt-2">
            <div
              className={`h-full transition-all ${strengthColor}`}
              style={{ width: `${(passwordStrength / 4) * 100}%` }}
            />
          </div>
        </div>

        <FieldRow label="Phone Number" value={form.phoneNumber}>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full outline-none py-1"
          />
        </FieldRow>

        <FieldRow label="Batch" value={form.batch}>
          <select
            name="batch"
            value={form.batch}
            onChange={handleChange}
            className="w-full outline-none py-1 bg-transparent"
          >
            <option value=""></option>
            {BATCHES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </FieldRow>

        <FieldRow label="Location" value={form.location}>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full outline-none py-1 bg-transparent"
          >
            <option value=""></option>
            {LOCATION.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </FieldRow>

        <FieldRow label="Course Type" value={form.courseType}>
          <select
            name="courseType"
            value={form.courseType}
            onChange={handleChange}
            className="w-full outline-none py-1 bg-transparent"
          >
            <option value=""></option>
            {COURSE_TYPE.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldRow>

{
    error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
    )
}

<button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
>
    {loading ? "Creating account..." : "Sign Up"}
</button>
      </form >
    </div >
  );
}


*/