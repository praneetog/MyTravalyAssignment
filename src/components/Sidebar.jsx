// Sidebar.jsx
import { NavLink } from "react-router-dom";
import { ImCross } from "react-icons/im";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/bookings", label: "Bookings" },
];

export default function Sidebar({ isMobile = false, onClose }) {
  return (
    <aside className="w-64 bg-[#0B0033] text-white px-4 py-6 h-screen flex flex-col">
      {/* Top: logo + optional close button */}
      <div className="mb-8 px-2 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-tight">MyTravaly</div>

        {isMobile && (
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <ImCross size={14} />
          </button>
        )}
      </div>

      {/* NavLinks */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
               ${isActive ? "bg-white text-[#0B0033]" : "hover:bg-white/10"}`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-3 text-sm">
        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
          P
        </div>
        <div>
          <p className="font-medium">Praneet Kashyap</p>
        </div>
      </div>
    </aside>
  );
}
