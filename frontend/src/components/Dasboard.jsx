// javascript
import NavaBar from "./NavaBar.jsx";
import { AppContext } from "../context/AppContext.jsx";
import SideBar from "./SideBar.jsx";
import { useContext } from "react";

const Dashboard = ({ children }) => {
    const { user } = useContext(AppContext);

    return (
        <>
            <NavaBar />

            {/* GLOBAL MODAL PORTAL allow clicks to pass through until modal sets pointer-events-auto */}
            <div id="modal-root" className="fixed inset-0 z-[9999] pointer-events-none"></div>

            {user && (
                <div className="flex h-[calc(100vh-80px)] relative z-0">
                    <div className="hidden lg:block">
                        <SideBar />
                    </div>

                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            bg-gradient-to-br from-neutral-50 via-white to-neutral-50
                            animate-slideUp
                            relative z-0
                        "
                    >
                        <div className="min-h-full">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;