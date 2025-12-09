import Dasboard from "../components/Dasboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { Plus, BarChart3, ListCollapse } from "lucide-react";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../utils/apiEndpoints.js";
import toast from "react-hot-toast";
import CategoryList from "../components/CategoryList.jsx";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal states
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) setCategories(response.data);
        } catch (e) {
            toast.error("Failed to fetch categories, please refresh");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;
        if (!name.trim()) return toast.error("Name is required");
        if (!type) return toast.error("Type is required");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.CREATE_CATEGORY, { name, type, icon });
            if (response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategories();
            }
        } catch (e) {
            toast.error("Failed to add category");
        }
    };

    const handleEditCategory = async (category) => {
        const { id, name, type, icon } = category;
        if (!name.trim()) return toast.error("Name is required");
        if (!type) return toast.error("Type is required");

        try {
            const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon });
            if (response.status === 200) {
                toast.success("Category updated successfully");
                setOpenEditCategoryModal(false);
                fetchCategories();
            }
        } catch (e) {
            toast.error("Failed to update category");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Count of income & expense categories
    const incomeCount = categories.filter((c) => c.type === "income").length;
    const expenseCount = categories.filter((c) => c.type === "expense").length;

    return (
        <Dasboard activeMenu="Category">
            <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">

                    {/* Header */}
                    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Categories</h2>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1">Manage your income and expense categories.</p>
                        </div>
                        <button
                            onClick={() => setOpenAddCategoryModal(true)}
                            className="flex items-center gap-2 bg-purple-100 text-purple-500 px-4 py-2 rounded-xl border border-purple-400 hover:bg-purple-200 transition-all shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Add Category
                        </button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {/* Income Categories */}
                        <div className="group relative card-elevated p-4 sm:p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Income Categories</p>
                                    <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                                        <ListCollapse className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{incomeCount}</h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">All income categories</p>
                            </div>
                        </div>

                        {/* Expense Categories */}
                        <div className="group relative card-elevated p-4 sm:p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Expense Categories</p>
                                    <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                                        <ListCollapse className="text-red-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{expenseCount}</h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">All expense categories</p>
                            </div>
                        </div>

                        {/* Total Categories */}
                        <div className="group relative card-elevated p-4 sm:p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-600">Total Categories</p>
                                    <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                                        <BarChart3 className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-auto">{categories.length}</h3>
                                <p className="text-xs text-neutral-500 mt-1 sm:mt-2">All categories</p>
                            </div>
                        </div>
                    </div>

                    {/* Category List */}
                    <div className="">
                        <CategoryList
                            categories={categories}
                            onEditCategory={(category) => {
                                setSelectedCategory(category);
                                setOpenEditCategoryModal(true);
                            }}
                        />
                    </div>

                    {/* Add Category Modal */}
                    <Modal
                        isOpen={openAddCategoryModal}
                        onClose={() => setOpenAddCategoryModal(false)}
                        title="Create A New Category "
                    >
                        <AddCategoryForm onAddCategory={handleAddCategory} />
                    </Modal>

                    {/* Edit Category Modal */}
                    <Modal
                        isOpen={openEditCategoryModal}
                        onClose={() => setOpenEditCategoryModal(false)}
                        title="Edit Category"
                    >
                        <AddCategoryForm
                            onAddCategory={handleEditCategory}
                            intialCategoryData={selectedCategory}
                            isEditing={true}
                        />
                    </Modal>

                </div>
            </div>
        </Dasboard>
    );
};

export default Category;
