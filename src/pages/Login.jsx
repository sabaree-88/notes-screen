import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://fast-api-notes.onrender.com/api/v1/auth/token",
        new URLSearchParams({ username: email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      login({ token: response.data.access_token, email });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message); // Log for debugging
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f1e8]">
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">🔑 Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between w-full">
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <Link to="/register">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
