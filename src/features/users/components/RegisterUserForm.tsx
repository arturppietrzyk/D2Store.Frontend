import { useState } from "react";
import { registerUser } from "../services/registerUser";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password != confirmPassword) {
            setMessage("❌ Passwords do not match.");
            return;
        }
        try {
            await registerUser({ firstName, lastName, email, password, phoneNumber, address });
            setMessage("✅ Registration successful!");
            navigate("/login");
        } catch (error: any) {
            if (error.response?.status == 400 || error.response?.status == 403 || error.response?.status == 404) {
                setMessage("❌ " + error.response.data.message);
            }
            else {
                setMessage("❌ Registration failed. Please contact the admin.");
            }
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                    type="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="John"
                    required 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                    type="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Smith"
                    required 
                />
            </div>
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
            <div>
                <label className="block text-sm font-medium text-gray-700">Re-type Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="••••••••"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="phoneNumber"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="xxxxxxxxxxx"
                    required 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="10 Hello St."
                    required 
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
                Register
            </button>
            {message && (
                <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
            )}
        </form>
    );
}

export default RegisterForm;
