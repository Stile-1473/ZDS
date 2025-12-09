import React, { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation.js";
import axiosConfig from "../utils/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../utils/apiEndpoints.js";
import toast from "react-hot-toast";

const Signup = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let tempErrors = {};

        if (!fullname) tempErrors.fullname = "Full name is required";
        if (!email) tempErrors.email = "Email is required";
        else if (!validateEmail(email)) {
            tempErrors.email = "Email is not valid";
        }
        if (!password) tempErrors.password = "Password is required";
        else if (!validatePassword(password)) {
            tempErrors.password =
                "Password must be at least 8 characters, include an uppercase letter and a number";
        }

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullname,
                email,
                password,
            });

            if (response.status === 201) {
                toast.success("Registration successful! Please login.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Signup error:", err);
            toast.error(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 rounded-3xl shadow-xl backdrop-blur-xl
        bg-white/60 border border-white/50 animate-fadeSlide"
            >
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
                    Create an Account ✨
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Track your income & expenses effortlessly 🚀
                </p>

                <div className="space-y-3">
                    <Input
                        label="Full Name"
                        value={fullname}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullname) setErrors({ ...errors, fullname: "" });
                        }}
                        placeholder="John Doe"
                        error={errors.fullname}
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="you@example.com"
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: "" });
                        }}
                        placeholder="Enter your password"
                        error={errors.password}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 py-3 rounded-xl bg-gray-900
          hover:bg-gray-800 text-white font-medium shadow-md
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
            Login
          </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
