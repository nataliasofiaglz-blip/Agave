"use client";
import { AuthProvider } from "../context/AuthContext";
import Header from "./Header";

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 80px)' }}>
                {children}
            </main>
        </AuthProvider>
    );
}
