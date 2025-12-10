import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["gray", "#0B0033", "#000000"];

export default function BookingStatusChart({ bookings, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-500">
        Loading booking status…
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-500">
        No bookings available.
      </div>
    );
  }

  // Count statuses from bookings array
  const counts = bookings.reduce(
    (acc, b) => {
      const status = (b.status || "").toLowerCase();
      if (status === "confirmed") acc.confirmed += 1;
      else if (status === "pending") acc.pending += 1;
      else if (status === "cancelled") acc.cancelled += 1;
      return acc;
    },
    { confirmed: 0, pending: 0, cancelled: 0 }
  );

  const data = [
    { name: "Cancelled", value: counts.cancelled },
    { name: "Confirmed", value: counts.confirmed },
    { name: "Pending", value: counts.pending },
  ];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
