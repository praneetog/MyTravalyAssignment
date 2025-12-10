import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueTrendChart({ trends, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-500">
        Loading revenue trend…
      </div>
    );
  }

  if (!trends || trends.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-500">
        No trend data available.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={trends}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" height={40} />
          <YAxis
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#0B0033"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
