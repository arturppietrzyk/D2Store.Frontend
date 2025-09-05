// import { useState } from "react";
// import { loginUser } from "../services/auth";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       const result = await loginUser({ email, password });
//       setMessage(`Login successful! Token: ${result}`);
//       // store token in localStorage/sessionStorage if needed
//       // localStorage.setItem("token", result.token);
//     } catch (error: any) {
//       setMessage("Login failed. Check your credentials.");
//       console.error(error);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email</label>
//         <input 
//           type="email" 
//           value={email}
//           onChange={e => setEmail(e.target.value)} 
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input 
//           type="password" 
//           value={password}
//           onChange={e => setPassword(e.target.value)} 
//         />
//       </div>
//       <button type="submit">Login</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }

// export default LoginForm;


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
      setMessage(`✅ Login successful! Token: ${result}`);
    } catch (error: any) {
      setMessage("❌ Login failed. Check your credentials.");
      console.error(error);
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
      >
        Login
      </button>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
}

export default LoginForm;
