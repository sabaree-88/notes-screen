import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/", {
        user_name: userName,
        user_email: email,
        password,
      });

      setSuccess("Registration successful! Redirecting to login...");
      setError("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(
        "❌ Registration Error:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.detail || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      <h1 className="text-3xl font-bold mb-4">📝 Register</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        placeholder="Username"
        className="border p-2 mb-2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}
