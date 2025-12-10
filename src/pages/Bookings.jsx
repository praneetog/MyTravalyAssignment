import { useState } from "react";
import { useBookings } from "../hooks/useBookings";

export default function Bookings() {
  const [inputDays, setInputDays] = useState("7");
  const [appliedDays, setAppliedDays] = useState(7);
  const [statusFilter, setStatusFilter] = useState("all");
  const [order, setOrder] = useState("asc");
  const [payment, setPayment] = useState("all");
  const [amountRange, setAmountRange] = useState("all");

  const { data, isLoading, isError, error } = useBookings({
    days: appliedDays,
    status: "all",
    order,
  });

  const bookings = data?.bookings ?? [];
  const filters = data?.filters ?? null;

  const filteredBookings = bookings.filter((b) => {
    // Payment filter
    const matchesPayment =
      payment === "all"
        ? true
        : payment === "paid"
        ? b.paymentStatus === "paid"
        : b.paymentStatus === "pending";

    // Amount filter
    const amt = b.amount ?? 0;
    let matchesAmount = true;

    if (amountRange === "<10000") {
      matchesAmount = amt < 10000;
    } else if (amountRange === "10000-20000") {
      matchesAmount = amt >= 10000 && amt <= 20000;
    } else if (amountRange === ">20000") {
      matchesAmount = amt > 20000;
    }

    // Status FIlter
    const matchesStatus =
    statusFilter === "all" ? true : b.status === statusFilter;

    return matchesPayment && matchesAmount && matchesStatus;
  });

  const applyDays = () => {
    if (inputDays === "") {
      setInputDays(String(appliedDays));
      return;
    }
    const n = Number(inputDays);
    if (Number.isFinite(n) && n > 0) {
      setAppliedDays(n);
    } else {
      setInputDays(String(appliedDays));
    }
  };

  return (
    <div className="flex-1 px-4 md:px-8 py-6 bg-slate-50">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0B0033]">Bookings</h1>
          <p className="text-sm text-slate-500">
            View and filter all bookings.
          </p>
        </div>
      </header>

      {/* Filters */}
      
      {/* Days */}
      <div className="flex flex-wrap gap-3 items-center mb-4 text-sm">
        <label className="flex items-center gap-2">
          <span>Days:</span>
          <input
            type="number"
            min={1}
            max={365}
            value={inputDays}
            onChange={(e) => setInputDays(e.target.value)}
            onBlur={applyDays}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyDays();
              }
            }}
            className="w-20 border border-slate-200 rounded-md px-2 py-1 text-sm"
          />
        </label>

        {/* Status */}
        <label className="flex items-center gap-2">
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-md px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        
        {/* Order Asc/Desc */}
        <label className="flex items-center gap-2">
          <span>Order:</span>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border border-slate-200 rounded-md px-2 py-1 text-sm"
          >
            <option value="asc">Check-in Asc</option>
            <option value="desc">Check-in Desc</option>
          </select>
        </label>

        {/* Payment */}
        <label className="flex items-center gap-2">
          <span>Payment:</span>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="border border-slate-200 rounded-md px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </label>

        {/* Amount */}
        <label className="flex items-center gap-2">
          <span>Amount:</span>
          <select
            value={amountRange}
            onChange={(e) => setAmountRange(e.target.value)}
            className="border border-slate-200 rounded-md px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="<10000">Below 10k</option>
            <option value="10000-20000">10k – 20k</option>
            <option value=">20000">Above 20k</option>
          </select>
        </label>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white border border-slate-100 rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0B0033] text-white">
            <tr>
              <th className="text-left py-2 px-3">ID</th>
              <th className="text-left py-2 px-3">Guest</th>
              <th className="text-left py-2 px-3">Hotel</th>
              <th className="text-left py-2 px-3">Check-in</th>
              <th className="text-left py-2 px-3">Check-out</th>
              <th className="text-left py-2 px-3">Amount</th>
              <th className="text-left py-2 px-3">Status</th>
              <th className="text-left py-2 px-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  className="py-4 px-3 text-center text-slate-500"
                  colSpan={8}
                >
                  Loading bookings…
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td
                  className="py-4 px-3 text-center text-slate-500"
                  colSpan={8}
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="border-t border-slate-100">
                  <td className="py-2 px-3 font-medium text-[#0B0033]">
                    {b.id}
                  </td>
                  <td className="py-2 px-3">{b.guestName}</td>
                  <td className="py-2 px-3">{b.hotelName}</td>
                  <td className="py-2 px-3">{b.checkIn}</td>
                  <td className="py-2 px-3">{b.checkOut}</td>
                  <td className="py-2 px-3">
                    ₹{b.amount.toLocaleString()} {b.currency}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : b.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-xs capitalize">
                    {b.paymentStatus}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filters && (
        <p className="mt-2 text-xs text-slate-500">
          Showing last {filters.days} days • Status: {filters.status}
        </p>
      )}
    </div>
  );
}
