import { useState } from "react";
import { loginUser } from "../services/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });
      setMessage(`Login successful! Token: ${result}`);
      // store token in localStorage/sessionStorage if needed
      // localStorage.setItem("token", result.token);
    } catch (error: any) {
      setMessage("Login failed. Check your credentials.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
