import Dasboard from "../components/Dasboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import {Plus, ArrowUpRight, ArrowDownLeft, Wallet, Coins, ArrowUp10Icon, ArrowUp, ArrowBigUp} from "lucide-react";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../utils/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
// import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
    useUser();

    const [incomeInfo, setIncomeInfo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [deleteIncome, setDeleteIncome] = useState({ show: false, data: null });

    const fetchIncomeCategories = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) setCategories(response.data);
        } catch (e) {
            toast.error("Failed to fetch income categories, please refresh");
        } finally {
            setLoading(false);
        }
    };

    const fetchIncomesData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) setIncomeInfo(response.data);
        } catch (e) {
            toast.error("Failed to fetch incomes");
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;
        if (!name.trim()) return toast.error("Name is required");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be > 0");
        if (!date) return toast.error("Date is required");
        if (!categoryId) return toast.error("Please select a category");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                categoryId,
                icon,
            });
            if (response.status === 201) {
                toast.success("Income added successfully");
                setOpenAddIncomeModal(false);
                fetchIncomesData();
                fetchIncomeCategories();
            }
        } catch (e) {
            toast.error("Failed to add income");
        }
    };

    const deleteIncomeInfo = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            toast.success("Deleted successfully");
            setDeleteIncome({ show: false, data: null });
            fetchIncomeCategories();
            fetchIncomesData();
        } catch (e) {
            toast.error("Failed to delete, try again");
        }
    };


    const handleDownloadIncomeDetails = ()=>{
        console.log("Downloading income details")
        toast.loading("Downloading feature coming soon")

    }


    useEffect(() => {
        fetchIncomesData();
        fetchIncomeCategories();
    }, []);

    return (
        <Dasboard activeMenu="Income">
            <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">

                    {/* Header */}
                    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Income Overview</h2>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1">Here is your income summary and transactions.</p>
                        </div>
                        <button
                            onClick={() => setOpenAddIncomeModal(true)}
                            className="flex items-center gap-2 bg-green-100 text-green-500 px-4 py-2 rounded-xl border border-green-400 hover:bg-green-200 transition-all shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Add Income
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
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Total Income</p>
                                    <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                                        <ArrowUpRight className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">
                                    ${incomeInfo.reduce((acc, i) => acc + i.amount, 0).toFixed(2)}
                                </h3>
                                <p className="text-xs flex gap-2 text-green-600 mt-1 sm:mt-2 font-medium">
                                    <ArrowBigUp className={"text-green-300"}/> {incomeInfo.length} transactions
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
                                    {incomeInfo.length}
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">All incomes</p>
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
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">Income categories</p>
                            </div>
                        </div>
                    </div>




                    {/* Income List */}

                        {incomeInfo.length === 0 ? (
                            <p className="text-center text-neutral-500 py-10">No income transactions yet.</p>
                        ) : (
                            <IncomeList
                                onDelete={(id) => setDeleteIncome({ show: true, data: id })}
                                transactions={incomeInfo}
                                onDownload={handleDownloadIncomeDetails}

                            />
                        )}


                    {/* Add Income Modal */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add An Income"
                    >
                        <AddIncomeForm onAddIncome={handleAddIncome} categories={categories} />
                    </Modal>

                    {/* Delete Income Modal */}
                    <Modal
                        isOpen={deleteIncome.show}
                        onClose={() => setDeleteIncome({ show: false, data: null })}
                        title="Delete Income"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this income?"
                            onDelete={() => deleteIncomeInfo(deleteIncome.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dasboard>
    );
};

export default Income;
