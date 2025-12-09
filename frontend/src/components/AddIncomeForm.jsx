import { useState } from "react";
import EmojiPickerPop from "./EmojiPickerPop.jsx";
import Input from "./Input.jsx";
import { Plus } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        categoryId: "",
        icon: "",
        date: ""
    });

    const categorySelections = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleChange = (field, value) => {
        setIncome({ ...income, [field]: value });
    };

    return (
        <div className="space-y-6 p-4 sm:p-6 h-fit bg-white
         backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
            <EmojiPickerPop
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={(value) => handleChange("categoryId", value)}
                isSelect={true}
                options={categorySelections}
            />

            <Input
                value={income.name}
                onChange={(value) => handleChange("name", value)}
                label="Income Source"
                placeholder="e.g Salary, Bonus, Freelance"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={(value) => handleChange("amount", value)}
                label="Amount"
                placeholder="e.g 2000"
                type="number"
            />

            <Input
                value={income.date}
                onChange={(value) => handleChange("date", value)}
                label="Date"
                type="date"
            />

            <div className="flex items-center justify-end pt-4">
                <button
                    onClick={() => onAddIncome(income)}
                    className=" w-full
                        flex items-center justify-center  gap-2 px-5 py-2.5
                        rounded-xl font-semibold
                        bg-gradient-to-r from-green-500 to-green-400
                        text-white shadow-md hover:shadow-lg
                        active:scale-95 transition-all
                    "
                >
                    <Plus className="w-4 h-4" />
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
