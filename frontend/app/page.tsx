"use client";
import { useState } from "react";
import CommandInput from "../components/CommandInput"

export default function Page() {
    return (
        <main className="bg-white text-black h-screen overflow-hidden">
            <h1>browser os</h1>
            <CommandInput/>
        </main>
    );
}