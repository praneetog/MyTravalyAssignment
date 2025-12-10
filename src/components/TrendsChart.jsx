import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TrendsChart({ trends, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-500">
        Loading chart…
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
        <BarChart
          data={trends}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X axis: months */}
          <XAxis dataKey="month" angle={0} textAnchor="end" height={40} />

          {/* Left Y axis for bookings */}
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} />

          {/* Right Y axis for revenue (₹ in thousands) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11 }}
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
          />

          <Tooltip />
          <Legend />

          {/* Bookings bar → left axis */}
          <Bar
            yAxisId="left"
            dataKey="bookings" 
            name="Bookings"
            fill="gray"
            radius={[4, 4, 0, 0]}
          />

          {/* Revenue bar → right axis */}
          <Bar
            yAxisId="right"
            dataKey="revenue"
            name="Revenue"
            fill="#0B0033"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
