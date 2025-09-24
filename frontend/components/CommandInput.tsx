"use client";
import React, { useState, useRef, useEffect } from "react";

export default function CommandInput() {
    // state vars
    const [command, setCommand] = useState("ls");
    const [argument, setArgument] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [collapsed, setCollapsed] = useState(false);

    const historyRef = useRef<HTMLDivElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // stops refresh
        const fullCommand = `${command} ${argument}`;
        setHistory((prev) => [...prev, fullCommand]);
        setArgument(""); // clear text after submit
    }

    function handleClear() {
        setHistory([]);
    }

    // auto scroll on terminal input
    useEffect(() => { // useEffect runs every time box changes
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="fixed bottom-0 left-0 w-max p-1 flex flex-col">
                {/* History */}
                {!collapsed && (
                    <div 
                        ref={historyRef} 
                        className="p-1 bg-black text-white overflow-y-auto h-20 w-full text-xs"
                    >
                        {history.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                )}

                {/* Dropdown */}
                <form className="flex gap-1 items-center" onSubmit={handleSubmit}>
                    <select value={command} onChange={(e) => setCommand(e.target.value)}>
                        <option value="ls">ls</option>
                        <option value="mkdir">mkdir</option>
                        <option value="touch">touch</option>
                        <option value="cat">cat</option>
                        <option value="rm">rm</option>
                    </select>

                    {/* Textbox */}
                    <input 
                        type="text" 
                        value={argument} 
                        placeholder="filename" 
                        onChange={(e) => setArgument(e.target.value)}
                    />

                    <button type="submit">run</button>

                    {/* Clear history button */}
                    <button
                        type="button"
                        onClick={handleClear}
                        className="h-5 px-1 bg-white text-black text-[10px]"
                    >
                        X
                    </button>

                    {/* Collapse Button */}
                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="h-5 px-1 bg-white text-black text-[10px]"
                    >
                        {collapsed ? "▲" : "▼"}
                    </button>
                </form>
            </div>
        </div>
    );
}