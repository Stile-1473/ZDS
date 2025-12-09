const DeleteAlert = ({ onDelete, content }) => {
    return (
        <div className="p-2">
            <p className="text-neutral-700 text-sm mb-6 leading-relaxed">{content}</p>

            <div className="flex justify-end gap-3">


                <button
                    onClick={onDelete}
                    type="button"
                    className="w-full bg-red-400
                    text-white
                            rounded-lg
                    border-red-200
                    border
                    text-2xl
                     gap-2 px-5 py-2.5
                    disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;