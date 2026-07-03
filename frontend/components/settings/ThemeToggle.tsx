"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {

    const [theme,setTheme]=useState("dark");

    useEffect(()=>{

        const saved=localStorage.getItem("theme") || "dark";

        setTheme(saved);

        document.documentElement.classList.toggle(
            "light",
            saved==="light"
        );

    },[]);

    function changeTheme(){

        const next=theme==="dark"?"light":"dark";

        setTheme(next);

        localStorage.setItem("theme",next);

        document.documentElement.classList.toggle(
            "light",
            next==="light"
        );
    }

    return(

        <button
        onClick={changeTheme}
        className="
        bg-[var(--primary)]
        px-4
        py-2
        rounded-xl
        "
        >
            {theme==="dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

    );

}