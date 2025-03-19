import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Navbar() {
  const { token, logout } = useAuthStore();

  return (
    <nav className="flex justify-between p-4 bg-blue-300 text-black shadow-lg">
      <Link to="/" className="text-lg font-bold">
        Keep Notes
      </Link>
      <div className="flex gap-4">
        <Link to="/notes">Notes</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
