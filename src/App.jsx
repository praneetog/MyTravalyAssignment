// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white text-slate-900">
        <Sidebar />
        {/* content */}
        <div className="flex-1 flex flex-col ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
