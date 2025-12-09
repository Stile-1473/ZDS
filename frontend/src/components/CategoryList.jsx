import { Edit2, ListCollapse } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
    return (
        <div className="w-full card-elevated p-6 sm:p-8 rounded-2xl bg-white shadow-lg border border-neutral-100">

            {/* Header */}
            <div className="flex items-center justify-between mb-7">
                <div>
                    <h4 className="text-xl font-bold text-neutral-900">Categories</h4>
                    <p className="text-sm text-neutral-500 mt-1">{categories.length} total categories</p>
                </div>
            </div>

            {categories.length === 0 ? (
                <div className="text-center py-14">
                    <div className="inline-flex p-4 rounded-full bg-neutral-100 mb-3 shadow-inner">
                        <ListCollapse className="w-7 h-7 text-neutral-400" />
                    </div>
                    <p className="text-neutral-700 font-semibold text-base">No categories yet</p>
                    <p className="text-neutral-400 text-sm mt-1">
                        Create your first category to get started.
                    </p>
                </div>
            ) : (
                <div className="max-h-[30rem] overflow-y-auto pr-1">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="
                                    group relative p-6 rounded-2xl
                                    bg-white/60 backdrop-blur-xl border border-neutral-200
                                    shadow-[0_6px_16px_rgba(0,0,0,0.06)]
                                    hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]
                                    hover:-translate-y-1
                                    transition-all duration-300
                                "
                            >
                                <div
                                    className="
                                        absolute inset-0 rounded-2xl opacity-0
                                        group-hover:opacity-100 transition duration-500
                                        bg-gradient-to-br from-neutral-50 via-white to-neutral-100
                                    "
                                ></div>

                                <div className="relative z-10 flex flex-col">

                                    <div
                                        className="
                                            w-14 h-14 flex items-center justify-center rounded-2xl mb-5
                                            bg-gradient-to-br from-blue-600 to-blue-500 text-white
                                            shadow-[0_8px_18px_rgba(59,130,246,0.35)]
                                            transition-transform duration-300 group-hover:scale-110
                                        "
                                    >
                                        {category.icon ? (
                                            <img
                                                src={category.icon}
                                                alt={category.name}
                                                className="w-7 h-7 object-contain"
                                            />
                                        ) : (
                                            <ListCollapse className="w-7 h-7" />
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-neutral-900 capitalize line-clamp-1">
                                        {category.name}
                                    </h3>


                                    <span
                                        className={`
                                            mt-2 px-3 py-1 w-fit text-xs font-semibold rounded-full capitalize
                                            ${
                                            category.type === "income"
                                                ? "bg-green-100 text-green-700 border border-green-200"
                                                : "bg-red-100 text-red-700 border border-red-200"
                                        }
                                        `}
                                    >
                                        {category.type}
                                    </span>

                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="
                                            mt-6 px-4 py-2.5 rounded-xl w-full
                                            bg-gradient-to-r from-blue-600 to-blue-500 text-white
                                            font-medium text-sm shadow-md
                                            hover:shadow-lg active:scale-[0.97]
                                            transition-all duration-300 relative overflow-hidden
                                        "
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <Edit2 className="w-4 h-4" />
                                            Edit Category
                                        </span>

                                        <span
                                            className="
                                                absolute inset-0 bg-white/20 opacity-0
                                                group-hover:opacity-30 transition duration-500
                                            "
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
