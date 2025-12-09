import Dasboard from "../components/Dasboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { TrendingUp, TrendingDown, Wallet, BarChart3, ArrowUpRight, ArrowDownLeft, PieChart, Calendar } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import AxiosConfig from "../utils/AxiosConfig.jsx";
import { API_ENDPOINTS, BASE_URL } from "../utils/apiEndpoints.js";
import { BarChart, Bar, PieChart as RechartsPie, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const Home = () => {
    useUser();
    const { user } = useContext(AppContext);
    
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        categoryCount: 0
    });
    
    const [chartData, setChartData] = useState({
        monthlyData: [],
        categoryBreakdown: [],
        incomeExpenseComparison: []
    });
    
    const [loading, setLoading] = useState(true);

    const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'];

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch all data in parallel
            const [incomeRes, expenseRes, categoriesRes] = await Promise.all([
                AxiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES),
                AxiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE),
                AxiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES)
            ]);

            const incomes = incomeRes.data || [];
            const expenses = expenseRes.data || [];
            const categories = categoriesRes.data || [];

            // Debug: log raw responses to help troubleshooting
            console.log('Dashboard fetched:', {
                incomesSample: incomes.slice(0,3),
                expensesSample: expenses.slice(0,3),
                categoriesSample: categories.slice(0,6),
            });

            // Calculate stats
            const totalIncome = incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
            const totalExpense = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
            const balance = totalIncome - totalExpense;

            setStats({
                totalIncome,
                totalExpense,
                balance,
                categoryCount: categories.length
            });

            // Process chart data
            processChartData(incomes, expenses, categories);
            
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const processChartData = (incomes, expenses, categories) => {
        // Monthly comparison data (last 6 months)
        const monthlyData = generateMonthlyData(incomes, expenses);
        
        // Category breakdown for expenses
        const categoryBreakdown = generateCategoryBreakdown(expenses, categories);
        
        // Income vs Expense comparison
        const incomeExpenseComparison = [
            { name: 'Income', value: incomes.reduce((sum, item) => sum + (item.amount || 0), 0), fill: '#10b981' },
            { name: 'Expense', value: expenses.reduce((sum, item) => sum + (item.amount || 0), 0), fill: '#ef4444' }
        ];

        setChartData({
            monthlyData,
            categoryBreakdown,
            incomeExpenseComparison
        });
    };

    const generateMonthlyData = (incomes, expenses) => {
        const data = {};
        
        // Generate last month
        for (let i = 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            data[monthKey] = { month: monthKey, income: 0, expense: 0 };
        }

        incomes.forEach(item => {
            const date = new Date(item.date);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            if (data[monthKey]) data[monthKey].income += item.amount || 0;
        });

        expenses.forEach(item => {
            const date = new Date(item.date);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            if (data[monthKey]) data[monthKey].expense += item.amount || 0;
        });

        return Object.values(data);
    };

    const generateCategoryBreakdown = (expenses, categories) => {
        const breakdown = {};
        
        expenses.forEach(expense => {
            const categoryId = expense.categoryId;
            const category = categories.find(c => c.id === categoryId);
            const categoryName = category?.name || 'Uncategorized';
            
            if (!breakdown[categoryName]) {
                breakdown[categoryName] = 0;
            }
            breakdown[categoryName] += expense.amount || 0;
        });

        return Object.entries(breakdown).map(([name, value]) => ({
            name,
            value: parseFloat(value.toFixed(2))
        })).sort((a, b) => b.value - a.value);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    };

    return (
        <Dasboard activeMenu="Dashboard">
            <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">

                    {/* Dashboard Heading */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Overview</h2>
                        <p className="text-xs sm:text-sm text-neutral-500 mt-1">Welcome back! Here's your financial summary.</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        {/* Balance Card */}
                        <div className="group relative card-elevated overflow-hidden p-4 sm:p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative p-0 sm:p-0 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Balance</p>
                                    <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                        <Wallet className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{formatCurrency(stats.balance)}</h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">Net balance</p>
                            </div>
                        </div>

                        {/* Income Card */}
                        <div className="group relative card-elevated overflow-hidden p-4 sm:p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative p-0 sm:p-0 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Total Income</p>
                                    <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                                        <ArrowUpRight className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{formatCurrency(stats.totalIncome)}</h3>
                                <p className="text-xs text-green-600 mt-1 sm:mt-2 font-medium">This month</p>
                            </div>
                        </div>

                        {/* Expense Card */}
                        <div className="group relative card-elevated overflow-hidden p-4 sm:p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative p-0 sm:p-0 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Total Expense</p>
                                    <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                                        <ArrowDownLeft className="text-red-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{formatCurrency(stats.totalExpense)}</h3>
                                <p className="text-xs text-red-600 mt-1 sm:mt-2 font-medium">This month</p>
                            </div>
                        </div>

                        {/* Categories Count */}
                        <div className="group relative card-elevated overflow-hidden p-4 sm:p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative p-0 sm:p-0 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Categories</p>
                                    <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                                        <BarChart3 className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{stats.categoryCount}</h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">Active categories</p>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    {!loading && (
                        <div className="mb-6">
                            
                            {/* Monthly Trend Chart */}
                            <div className="card-elevated p-6 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-neutral-900">Monthly Trend</h3>
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                {chartData.monthlyData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={chartData.monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                                formatter={(value) => formatCurrency(value)}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-64 flex items-center justify-center text-neutral-500">
                                        <p>No data available yet</p>
                                    </div>
                                )}
                            </div>




                        </div>
                    )}



                </div>
            </div>
        </Dasboard>
    );
};

export default Home;
