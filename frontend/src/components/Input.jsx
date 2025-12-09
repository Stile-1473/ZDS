import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

const iconMap = {
    fullname: <User className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />,
    email: <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />,
    password: <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />,
};

const Input = ({
                   label,
                   value,
                   onChange,
                   placeholder,
                   type = "text",
                   required = true,
                   error = "",
                   isSelect = false,
                   options = []
               }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="flex flex-col w-full mb-4 sm:mb-5 relative">
            {label && (
                <label
                    htmlFor={label}
                    className="mb-2 text-xs sm:text-sm font-semibold text-neutral-700 block"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1"></span>}
                </label>
            )}

            <div className="relative">
                {iconMap[label?.toLowerCase()] && (
                    <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none flex-shrink-0">
                        {iconMap[label.toLowerCase()]}
                    </span>
                )}

                {isSelect ? (
                    <select
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${iconMap[label?.toLowerCase()] ? 'pl-9 sm:pl-11' : ''} rounded-lg border 
                        bg-white font-medium text-sm sm:text-base text-neutral-900 placeholder-neutral-500
                        transition-all duration-200 focus:outline-none
                        ${error 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-neutral-300 hover:border-neutral-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        <option value="">Select {label?.toLowerCase() || 'option'}...</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={label}
                        type={isPassword && showPassword ? "text" : type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${iconMap[label?.toLowerCase()] ? 'pl-9 sm:pl-11' : ''} rounded-lg border
                        bg-white font-medium text-sm sm:text-base text-neutral-900 placeholder-neutral-500
                        transition-all duration-200 focus:outline-none
                        ${error 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-neutral-300 hover:border-neutral-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                    />
                )}

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                        tabIndex="-1"
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 font-medium flex items-center gap-1">
                    <span className="text-xs">⚠</span>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
