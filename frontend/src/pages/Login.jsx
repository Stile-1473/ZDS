import React, {useContext, useState} from "react";
import Input from "../components/Input.jsx";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { validateEmail } from "../utils/validation.js";
import axiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.js";
import {AppContext} from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let tempErrors = {};
        if (!email) tempErrors.email = "Email is required";
        else if (!validateEmail(email)) {
            tempErrors.email = "Email is not valid";
        }
        if (!password) tempErrors.password = "Password is required";

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 rounded-3xl shadow-xl
                bg-white border border-gray-300
                animate-fadeSlide"
            >
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                    Welcome Back 👋
                </h2>

                <div className="space-y-3">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(value) => {
                            setEmail(value);
                            if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="you@example.com"
                        icon={<Mail size={18} className="text-gray-500" />}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(value) => {
                            setPassword(value);
                            if (errors.password) setErrors({ ...errors, password: "" });
                        }}
                        placeholder="Enter your password"
                        icon={<Lock size={18} className="text-gray-500" />}
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
                    {isLoading ? "Logging In..." : "Login"}
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
