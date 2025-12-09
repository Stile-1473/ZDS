import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, Bell, Search, User, User2, X } from "lucide-react";
import SideBar from "./SideBar.jsx";

const NavaBar = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const dropdownRef = useRef();
    const { user, clearUserInfo } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowDropDown(false);
        clearUserInfo();
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropDown(false);
            }
        };

        if (showDropDown) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropDown]);

    return (
        <>
            {/* NAVBAR */}
            <div
                className="
                flex items-center justify-between gap-5
                px-5 py-3
                sticky top-0 z-[1000]

                bg-white/40 backdrop-blur-xl
                border-b border-white/30
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]

                rounded-b-3xl
            "
            >
                {/* LEFT AREA */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu */}
                    <button
                        onClick={() => setSideBarOpen(!sideBarOpen)}
                        className="
                            block lg:hidden
                            p-2 rounded-xl
                            bg-white/60 hover:bg-white/90
                            shadow-sm transition
                        "
                    >
                        {sideBarOpen ? <X /> : <Menu />}
                    </button>

                    <h5 className="text-xl font-semibold tracking-wide text-gray-800">
                        ZDS Billing App
                    </h5>
                </div>

                {/* RIGHT AREA */}
                <div className="flex items-center gap-4">


                    {/* Profile */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropDown(!showDropDown)}
                            className="
                                w-11 h-11 flex items-center justify-center
                                bg-white/70 hover:bg-white/90
                                rounded-full shadow
                                transition
                            "
                        >
                            <User className="text-gray-700" />
                        </button>

                        {/* Dropdown */}
                        {showDropDown && (
                            <div
                                className="
                                absolute right-0 mt-3 w-60
                                bg-white/90 backdrop-blur-xl
                                border border-gray-200/70
                                rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                                animate-dropdown z-[3000]
                            "
                            >
                                {/* USER INFO */}
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                                    <div className="bg-gray-100 p-2 rounded-full shadow">
                                        <User2 className="text-gray-700" size={22} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm leading-none">
                                            {user.fullName}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* LOGOUT */}
                                <button
                                    onClick={handleLogout}
                                    className="
                                        flex items-center gap-3 w-full
                                        px-4 py-3 text-sm font-medium
                                        text-red-600 hover:bg-red-50
                                        transition rounded-b-2xl
                                    "
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE SIDEBAR */}
            {sideBarOpen && (
                <div
                    className="
                    fixed top-[73px] left-0 right-0
                    lg:hidden
                    z-[1500]
                    bg-white/70 backdrop-blur-xl
                    border-r shadow-xl
                    animate-slideLeft
                "
                >
                    <SideBar />
                </div>
            )}
        </>
    );
};

export default NavaBar;
