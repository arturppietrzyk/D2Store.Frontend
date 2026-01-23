import { useEffect, useState } from 'react';
import { getUserById } from '../services/getUser';
import type { UpdateRequest } from "../types/updateRequest";
import { updateUser } from '../services/userService';
import { getUserIdFromToken } from "../../../utils/jwtDecoder";
import axios from "axios";

const ProfileForm = () => {
    const [formData, setFormData] = useState<UpdateRequest>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const currentUserId = getUserIdFromToken();

    useEffect(() => {
        if (!currentUserId) {
            setError("No user session found.");
            setIsLoading(false);
            return;
        }
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const data = await getUserById(currentUserId);
                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phoneNumber: data.phoneNumber || '',
                    address: data.address || ''
                });
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    const status = err.response?.status;
                    const serverErrorMessage = err.response?.data?.message;

                    if (status && [400, 403, 404, 500].includes(status)) {
                        setError((serverErrorMessage));
                    } else {
                        setError("Failed to load user profile. Please contact the admin.");
                    }
                }
                else {
                    setError("Failed to load user profile.");
                }
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [currentUserId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (successMsg) setSuccessMsg(null);
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUserId) return;
        setIsSaving(true);
        setError(null);
        setSuccessMsg(null);
        try {
            await updateUser(currentUserId, formData);
            setSuccessMsg("Profile updated successfully!");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                const serverErrorMessage = err.response?.data?.message;
               if (status && [400, 403, 404, 500].includes(status)) {
                        setError((serverErrorMessage));
                    } else {
                        setError("Failed update user profile. Please contact the admin.");
                    }
                }
                else {
                    setError("Failed to update user profile. Please contact the admin.");
                }
                console.error(err);
            } finally {
                setIsSaving(false);
            }
    };

    if (isLoading) return <div className="p-4 text-blue-600 font-medium">Loading profile...</div>;

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
            {successMsg && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{successMsg}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">First Name</label>
                    <input
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Last Name</label>
                    <input
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition hover:bg-blue-700 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default ProfileForm;