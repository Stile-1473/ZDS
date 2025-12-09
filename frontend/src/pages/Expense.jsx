import Dasboard from "../components/Dasboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import {ArrowBigDown, ArrowDownLeft, ArrowUpRight, Coins, Plus, PlusSquare} from "lucide-react";
import {useEffect, useState} from "react";
import axiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenxeList from "../components/ExpenxeList.jsx";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import AddExpense from "../components/AddExpense.jsx";

const Expense = () => {
    useUser();
    const [expenseInfo,setExpenseInfo] = useState([])
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    const [openAddExpenseModal, setAddExpenseModal] = useState(false);
    const [deleteExpense,setDeleteExpense] = useState({
        show:false,
        data:null,
    })

    const fetchExpenseInfo =async () =>{
        if(loading)return

        setLoading(true)

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE)
            if(response.status === 200){
                setExpenseInfo(response.data)
                console.log("expense info:",response.data)
            }
        }catch (e){
            toast.error("Failed to fetch expense refresh browser")
            console.log(e.message)
        }finally {
            setLoading(false)
        }
    }


    const fetchExpenseCategories =async ()=>{
        if(loading)return
        setLoading(true)

        try {
           const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"))
            if(response.status === 200){
                setCategories(response.data)
                console.log("Expense categories",response.data)
            }
        }catch (e){
            toast.error("failed to fetch expense categories")
            console.log(e.message)
        }finally {
            setLoading(false)
        }

    }

    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;
        if (!name.trim()) return toast.error("Name is required");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be greater than  0");
        if (!date) return toast.error("Date is required");
        if (!categoryId) return toast.error("Please select a category");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                categoryId,
                icon,
            });
            if (response.status === 201) {
                toast.success("Expense added successfully");
                setAddExpenseModal(false);
                fetchExpenseCategories();
                fetchExpenseInfo()
            }
        } catch (e) {
            toast.error("Failed to add expense");
        }
    };




    const handleDownloadIncomeDetails = ()=>{
        console.log("Downloading expense details")
        toast.loading("Downloading feature coming soon")

    }



    const handledeleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            toast.success("Deleted successfully");
            setDeleteExpense({ show: false, data: null });
            fetchExpenseCategories();
            fetchExpenseInfo()
        } catch (e) {
            toast.error("Failed to delete, try again");
        }
    };
    useEffect(()=>{
        fetchExpenseCategories()
        fetchExpenseInfo()
    },[])

    return (
        <Dasboard activeMenu="Expense">
            <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">

                    {/* Header */}
                    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Expenses Overview</h2>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1">Here is your expenses summary and transactions.</p>
                        </div>
                        <button
                            onClick={() => setAddExpenseModal(true)}
                            className="flex items-center gap-2 bg-red-100 text-red-500 px-4 py-2 rounded-xl border border-red-400 hover:bg-red-200 transition-all shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Add Expense
                        </button>
                    </div>
                    <div className="block">

                    </div>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {/* Total Income */}
                        <div className="group relative card-elevated p-4 sm:p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Total Expense</p>
                                    <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                                        <ArrowDownLeft className="text-red-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">
                                    ${expenseInfo.reduce((acc, i) => acc + i.amount, 0).toFixed(2)}
                                </h3>
                                <p className="text-xs flex gap-2
                                text-green-600 mt-1 sm:mt-2 font-medium">
                                    <ArrowBigDown className={"text-red-300"}/> {expenseInfo.length} transactions
                                </p>
                            </div>
                        </div>

                        {/* Total Transactions */}
                        <div className="group relative card-elevated p-4 sm:p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Transactions</p>
                                    <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                        <Coins className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">
                                    {expenseInfo.length}
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">All Expenses</p>
                            </div>
                        </div>

                        {/* Placeholder Card */}
                        <div className="group relative card-elevated p-4 sm:p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Categories</p>
                                    <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                                        <Coins className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{categories.length}</h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">Expense categories</p>
                            </div>
                        </div>
                    </div>


                    {expenseInfo.length === 0 ? (


                        <div className="card-elevated p-6 sm:p-8 text-center">
                            <div className="inline-flex p-3 rounded-full bg-red-50 mb-4">
                                <PlusSquare className="text-red-600 w-8 h-8" />
                            </div>
                            <p className="text-neutral-500 font-medium text-sm sm:text-base">No expenses recorded yet</p>
                            <p className="text-neutral-400 text-xs sm:text-sm mt-1">Start tracking your expenses by clicking the button above</p>
                        </div>
                    ) : (

                        <ExpenxeList
                            onDelete={(id) => setDeleteExpense({ show: true, data: id })}
                        transactions={expenseInfo}
                            onDownload={handleDownloadIncomeDetails}

                        />
                    )}



                    {/* Add Income Modal */}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setAddExpenseModal(false)}
                        title="Add An Expense"
                    >
                        <AddExpense onAddExpense={handleAddExpense} categories={categories} />
                    </Modal>

                    {/* Delete Income Modal */}
                    <Modal
                        isOpen={deleteExpense.show}
                        onClose={() => setDeleteExpense({ show: false, data: null })}
                        title="Delete expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense?"
                            onDelete={() => handledeleteExpense(deleteExpense.data)}
                        />
                    </Modal>

                </div>
            </div>
        </Dasboard>
    );
};

export default Expense;
