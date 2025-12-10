// App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import { GiHamburgerMenu } from "react-icons/gi";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white text-slate-900">
        {/* Desktop sidebar: visible on lg and up */}
        <div className="hidden lg:block fixed h-screen">
          <Sidebar />
        </div>

        {/* Mobile / tablet sidebar (overlay drawer) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            {/* drawer on the LEFT */}
            <div className="w-64 bg-[#0B0033]">
              <Sidebar isMobile onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* dark overlay on the RIGHT */}
            <div
              className="flex-1 bg-black/40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Top bar with hamburger on small/medium screens */}
          <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-slate-200">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md border border-slate-200"
              aria-label="Open sidebar"
            >
              <GiHamburgerMenu size={20} />
            </button>
            <span className="font-semibold text-[#0B0033]">
              Hotel Booking Analytics
            </span>
          </header>

          {/* Page content */}
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
