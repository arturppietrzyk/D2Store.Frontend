import { useState } from "react";
import { loginUser } from "../services/loginUser";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      //const jwtToken: string = await loginUser({ email, password });
      await loginUser({email, password});
      setMessage("✅ Login successful!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.status == 400 || error.response?.status == 401 || error.response?.status == 403 || error.response?.status == 404) {
        setMessage("❌ " + error.response.data.message);
      }
      else {
        setMessage("❌ Login failed. Please contact the admin.");
      }
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
        Login
      </button>
      {message && (
        <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
      )}
    </form>
  );
}

export default LoginForm;
