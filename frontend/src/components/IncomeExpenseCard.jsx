import { ArrowDownLeft, ArrowUpRight, Coins, Trash2 } from "lucide-react";

const IncomeExpenseCard = ({
                               icon,
                               name,
                               title,
                               date,
                               amount,
                               type,
                               hideDeleteBtn,
                               onDelete
                           }) => {
    const isIncome = type === "income";

    const amountStyles = isIncome
        ? "bg-green-100/60 text-green-700 border-green-300/40"
        : "bg-red-100/60 text-red-700 border-red-300/40";

    const iconBg = isIncome ? "bg-green-100" : "bg-red-100";
    const iconColor = isIncome ? "text-green-600" : "text-red-600";

    return (
        <div
            className="
                group relative
                p-4 sm:p-5 rounded-2xl border border-gray-100
                bg-white/60 backdrop-blur-xl shadow-[0_4px_14px_rgba(0,0,0,0.06)]
                hover:shadow-[0_8px_25px_rgba(0,0,0,0.09)]
                transition-all duration-300 overflow-hidden
                animate-slideUp cursor-pointer
            "
        >
            <div
                className={`absolute inset-0 rounded-2xl 
                bg-gradient-to-br ${
                    isIncome ? "from-green-300/10" : "from-red-300/10"
                } to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>

            <div className="relative z-10 flex items-center gap-4">
                <div
                    className={`
                        flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14
                        flex items-center justify-center rounded-xl
                        ${iconBg} shadow-inner
                        group-hover:scale-110 transition-transform duration-300
                    `}
                >
                    {icon ? (
                        <img
                            src={icon}
                            alt={title}
                            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                        />
                    ) : (
                        <Coins className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColor}`} />
                    )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                        {title}
                    </p>

                    <p className="text-sm text-gray-500 mt-0.5">{date}</p>
                </div>

                <div className="flex  items-end gap-2 flex-shrink-0">
                    <span
                        className={`
                            inline-flex items-center gap-1
                            px-3 py-1.5 sm:px-4 sm:py-2
                            rounded-xl border font-semibold
                            text-sm whitespace-nowrap
                            ${amountStyles}
                        `}
                    >
                        {isIncome ? (
                            <ArrowUpRight className="w-4 h-4" />
                        ) : (
                            <ArrowDownLeft className="w-4 h-4" />
                        )}

                        {isIncome ? "+" : "-"} ${amount}
                    </span>

                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className="
                                opacity-0 group-hover:opacity-100
                                p-2 rounded-lg
                                bg-gray-100 hover:bg-red-100
                                text-gray-500 hover:text-red-600
                                transition-all duration-200
                                shadow-sm hover:shadow
                                active:scale-95
                            "
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseCard;
