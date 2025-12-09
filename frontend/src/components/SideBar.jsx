import {useContext, useRef, useState} from "react";
import { AppContext } from "../context/AppContext.jsx";
import { LogOut, User, Menu } from "lucide-react";
import { side_Bar_Data } from "../assets/assets.js";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (path) => location.pathname === path;

    const [showDropDown, setShowDropDown] = useState(false);

    const dropdownRef = useRef();

    const {  clearUserInfo } = useContext(AppContext);

    const handleLogout = () => {
        setShowDropDown(false);
        clearUserInfo();
        navigate("/login");
    };

    return (
        <div
            className={`flex flex-col
             justify-between rounded-3xl overflow-hidden mb-4
        bg-white backdrop-blur-xl border border-gray-200 shadow-lg
        h-[calc(100vh-61px)] sticky top-[61px]
        animate-pulse transition-all ease-in-out duration-150
        ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Toggle Button */}
            <div className="flex justify-end p-3">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg bg-white/60 hover:bg-white/90 shadow-sm transition active:scale-95"
                >
                    <Menu className="text-gray-600" size={20} />
                </button>
            </div>

            {/* Profile Section */}
            <div className={`flex flex-col items-center gap-2 p-4 transition-opacity duration-300 ${collapsed ? "opacity-0 h-0" : "opacity-100"}`}>
                <div className="bg-gradient-to-tr from-blue-100 to-blue-50 p-4 rounded-full shadow-inner">
                    <User className="w-14 h-14 text-blue-700" />
                </div>
                <h5 className="text-gray-900 font-semibold text-center">{user?.fullName || "Dashboard User"}</h5>
                <p className="text-xs text-gray-500">Welcome back!</p>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 flex flex-col gap-2 px-2 sm:px-3">
                {side_Bar_Data.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(item.path)}
                        className={`relative flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-gray-600
              hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-blue-700
              transition-all duration-300 shadow-sm
              ${isActive(item.path) ? "bg-blue-200 text-blue-800 shadow-lg" : ""}
              ${collapsed ? "justify-center px-2" : ""}`}
                    >
                        <item.icon
                            size={20}
                            className={`transition-transform duration-300 ${isActive(item.path) ? "animate-bounce text-blue-700" : "text-blue-600"}`}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}

                        {/* Tooltip on collapsed */}
                        {collapsed && (
                            <span className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                {item.label}
              </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4">
                <button
                    onClick={ handleLogout}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl
                     text-red-600 bg-red-50 hover:bg-red-100 hover:shadow-md transition
            ${collapsed ? "justify-center" : ""}`}
                >
                    <LogOut size={20} />
                    {!collapsed && "Logout"}
                </button>
            </div>
        </div>
    );
};

export default SideBar;
