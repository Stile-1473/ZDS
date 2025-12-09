import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Expense from "./pages/Expense.jsx";
import Income from "./pages/Income.jsx";
import SignUp from "./pages/SignUp.jsx";
import Category from "./pages/Category.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            {/* Global Toaster */}
            <Toaster

                containerStyle={{
                    zIndex: 30000, // above modals
                    pointerEvents: "none", // clicks pass through
                }}
                toastOptions={{
                    duration: 3000,
                    className:
                        "backdrop-blur-xl bg-white/60 border border-white/30 shadow-lg rounded-2xl text-gray-900 font-semibold px-5 py-3 mb-3",
                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#f0fdf4",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fef2f2",
                        },
                    },
                }}
            />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/category" element={<Category />} />

                </Routes>
            </BrowserRouter>
        </>
    );
};

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;
