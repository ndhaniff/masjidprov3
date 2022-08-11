import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {};

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    const dark = "https://cdn.syncfusion.com/ej2/bootstrap5-dark.css";
    const light = "https://cdn.syncfusion.com/ej2/bootstrap5.css";
    const [stylePath, setStylePath] = useState(light);
    const [isDark, setIsDark] = useState(false);
    const [themeColor, setThemeColor] = useState("#C3B1E1");

    const toggleMode = () => {
        setStylePath(isDark ? dark : light);
        setIsDark((prev) => !prev);
    };

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                screenSize,
                setScreenSize,
                isDark,
                toggleMode,
                themeColor,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
