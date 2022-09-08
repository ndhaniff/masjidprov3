import React, { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
    const token = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;
    const { toggleMode, isDark, screenSize, setActiveMenu, themeColor } =
        useStateContext();

    /* ---------------------------- Responsive Effect --------------------------- */
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
        <TooltipComponent content={title} position="BottomCenter">
            <button
                type="button"
                onClick={customFunc}
                className="relative text-xl rounded-full p-3 hover:bg-light-gray dark:text-white text-gray-600"
            >
                <span
                    style={{ background: dotColor }}
                    className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
                />
                {icon}
            </button>
        </TooltipComponent>
    );

    return (
        <div className="flex items-center justify-between p-3 relative dark:text-white bg-main-bg dark:bg-slate-600 drop-shadow-sm">
            <NavButton
                title="Menu"
                customFunc={() => setActiveMenu((prev) => !prev)}
                icon={<AiOutlineMenu />}
            ></NavButton>
            <div className="flex gap-1 items-center">
                <div className="hover:cursor-pointer font-bold pr-5">
                    <form action="/logout" method="POST">
                        <input type="hidden" name="_token" value={token} />
                        <button type="submit">Keluar</button>
                    </form>
                </div>
                <button className="text-xl" onClick={toggleMode}>
                    {!isDark ? "🌞" : "🌝"}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
