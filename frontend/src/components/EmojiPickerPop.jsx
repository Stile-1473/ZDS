import { useState } from "react";
import { Image, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { createPortal } from "react-dom";

const EmojiPickerPop = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || emoji?.emoji || "");
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(true)}
                className="w-full flex gap-4 items-center cursor-pointer p-4 rounded-lg border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
                <div className="flex w-14 h-14 justify-center items-center text-2xl border border-neutral-300 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
                    {icon ? (
                        <img src={icon} className="w-8 h-8" alt="selected icon" />
                    ) : (
                        <Image size={20} className="text-neutral-500" />
                    )}
                </div>
                <div className="text-left">
                    <p className="font-semibold text-neutral-900">{icon ? "Change Icon" : "Pick Icon"}</p>
                    <p className="text-xs text-neutral-500">Click to select an emoji</p>
                </div>
            </button>

            {isOpen &&
                createPortal(
                    <div className="fixed z-[99999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl animate-fadeInScale">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center bg-white border border-neutral-300 rounded-full z-50 hover:bg-neutral-100 transition-colors active:scale-95"
                            aria-label="Close emoji picker"
                        >
                            <X size={16} className="text-neutral-700" />
                        </button>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default EmojiPickerPop;
