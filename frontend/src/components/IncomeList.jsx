import { Download, Mail } from "lucide-react";
import IncomeExpenseCard from "./IncomeExpenseCard.jsx";


const IncomeList = ({transactions, onDelete ,onDownload}) => {
    return(
        <div className="card-elevated p-4 sm:p-6 w-full animate-slideUp">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="min-w-0">
                    <h5 className="text-base sm:text-lg font-semibold text-neutral-900">All Transactions</h5>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="flex items-center justify-start sm:justify-end gap-2 w-full sm:w-auto flex-wrap">

                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-purple-700 hover:bg-neutral-200 text-white transition-all active:scale-95 flex-1 sm:flex-none">
                        <Download size={16} />
                        Download
                    </button>
                </div>
            </div>

            {transactions.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex p-3 rounded-full bg-neutral-100 mb-3">
                        <Mail className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="text-neutral-500 font-medium text-sm sm:text-base">No transactions yet</p>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-1">Add your first transaction to get started</p>
                </div>
            ) : (
                <div className="space-y-2 sm:space-y-3">
                    {transactions.map((trans) => (
                        <IncomeExpenseCard
                            key={trans.id}
                            icon={trans.icon}
                            title={trans.name}
                            type="income"
                            date={new Date(trans.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                            amount={trans.amount}
                            onDelete={() => onDelete(trans.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}


export default IncomeList