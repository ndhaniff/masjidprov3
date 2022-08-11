import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../Contexts/ContextProvider";
import { Sidebar, Navbar } from "../Components";

const Admin = ({ children }) => {
    const { screenSize, setScreenSize, activeMenu, setActiveMenu, isDark } =
        useStateContext();

    /* -------------------------------- Get window width ------------------------------- */
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={isDark ? "dark" : ""}>
            <div className="flex relative dark:bg-slate-600">
                {/* --------------------------------- Sidebar -------------------------------- */}
                {activeMenu ? (
                    <div className="w-72 sidebar fixed dark:bg-slate-600 bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 sidebar fixed ">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={`'dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                        activeMenu ? "md:ml-72" : "flex-2"
                    }`}
                >
                    <div className=" navbar w-full">
                        <Navbar />
                    </div>
                    <div className="page-content min-h-screen flex-1 p-8 dark:bg-slate-600 dark:text-white">
                        {children}
                    </div>

                    <footer className="fixed bg-white dark:bg-slate-600 dark:text-white drop-shadow-md p-2 bottom-0 left-0 md:left-72 text-center w-full md:w-[calc(100vw-240px)]">
                        <div>
                            Dijahit khas oleh{" "}
                            <a
                                href="https://mercuweb.com"
                                className="font-bold"
                                target="_blank"
                            >
                                Mercuweb
                            </a>{" "}
                            &copy; {new Date().getFullYear()}
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Admin;
