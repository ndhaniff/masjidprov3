import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaMosque } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { BiChevronDown } from "react-icons/bi";
import { nav, navCat } from "../routes";
import { usePage } from "@inertiajs/inertia-react";

const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize } = useStateContext();
    const { url, component } = usePage();
    const handleCloseSidebar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    const activeLink =
        "capitalize transition-all ease-in-out duration-150 py-2 flex items-center font-semibold  gap-2";
    const normalLink =
        "capitalize transition-all ease-in-out duration-150 dark:text-gray-400 text-gray-500 py-2 flex items-center font-semibold  gap-2";

    return (
        <div className=" h-screen text-gray-600 md:overflow-hidden shadow-md overflow-auto md:hover:overflow-auto pb-10 dark:bg-slate-600">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link
                            href="/"
                            onClick={handleCloseSidebar}
                            className="w-full flex items-center justify-center gap-2 py-4 mt-1 text-2xl font-extrabold tracking-tight dark:text-white text-slate-900 hover:text-slate-900 dark:hover:text-white border-b border-gray-100 dark:border-none dark:shadow-sm"
                        >
                            <FaMosque /> <span>Promasjid</span>
                        </Link>
                        <TooltipComponent
                            content="Menu"
                            position="BottomCenter"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveMenu((prev) => !prev)}
                                className="text-xl p-3 rounded-full hover:bg-light-gray mt-4 block md:hidden"
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>
                    {/* -------------------------------- Searchbox ------------------------------- */}
                    {/* <div className="py-4 px-6">
                        <div className="e-input-group">
                            <input
                                className="e-input"
                                type="text"
                                placeholder="Cari..."
                                data-np-checked="1"
                            ></input>
                            <div className="e-input-group-icon">
                                <AiOutlineSearch />
                            </div>
                        </div>
                    </div> */}
                    {/* --------------------------------- Routes --------------------------------- */}
                    <div className="mt-2">
                        {navCat.map((cat) => (
                            <div key={cat} className="py-2">
                                <p className="text-sm dark:text-gray-300 font-bold px-8">
                                    {cat.toUpperCase()}
                                </p>
                                {nav[cat].map((child) => {
                                    if (child.hasOwnProperty("subs")) {
                                        return (
                                            <div key={child.name}>
                                                {url.startsWith("/qariah")}
                                                <div
                                                    className={`flex items-center dark:hover:text-gray-500 hover:bg-sky-200 hover:text-slate-600 hover:cursor-pointer font-semibold px-8 py-2 mb-2 justify-between ${
                                                        url.startsWith(
                                                            "/qariah"
                                                        )
                                                            ? " bg-sky-500 text-white dark:text-white"
                                                            : " dark:text-gray-400 "
                                                    }`}
                                                >
                                                    <p className="capitalize mb-0 flex items-center gap-2">
                                                        {child.icon}
                                                        {child.name}
                                                    </p>
                                                    <BiChevronDown
                                                        size={24}
                                                    ></BiChevronDown>
                                                </div>
                                                <ul className="pl-16">
                                                    {child.subs.map((l) => (
                                                        <Link
                                                            key={l.name}
                                                            className={
                                                                (url.split(
                                                                    "?"
                                                                )[0] === l.url
                                                                    ? activeLink +
                                                                      " text-sky-500"
                                                                    : normalLink) +
                                                                " hover:text-sky-500 "
                                                            }
                                                            href={l.url}
                                                        >
                                                            {l.text}
                                                        </Link>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <Link
                                                key={child.name}
                                                className={
                                                    (url === child.url
                                                        ? activeLink +
                                                          " bg-sky-500  text-white"
                                                        : normalLink) +
                                                    " px-8 hover:bg-sky-200 hover:text-slate-600"
                                                }
                                                href={child.url}
                                            >
                                                {child.icon} {child.name}
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
