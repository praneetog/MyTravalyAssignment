// pages/Dashboard.jsx
import { useMetrics } from "../hooks/useMetrics";
import { useTrends } from "../hooks/useTrends";
import { useBookings } from "../hooks/useBookings";
import TrendsChart from "../components/TrendsChart";
import RevenueTrendChart from "../components/RevenueTrendChart";
import BookingStatusChart from "../components/BookingStatusChart";

function MetricCard({ label, value, suffix }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#0B0033]">
        {value}
        {suffix && (
          <span className="text-sm text-slate-500 ml-1">{suffix}</span>
        )}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { data: metrics, loading: metricsLoading } = useMetrics(60);
  const { data: trends, period, loading: trendsLoading } = useTrends(6);
  const { data: bookingsData, isLoading: bookingsLoading } = useBookings({
    days: 7,
    status: "all",
    order: "asc",
  });
  const bookings = bookingsData?.bookings ?? [];

  return (
    <div className="flex-1 px-4 md:px-8 py-6 bg-slate-50">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0B0033]">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Overview of bookings, revenue and trends.
          </p>
        </div>
      </header>

      {/* Metrics row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricsLoading || !metrics ? (
          <p className="col-span-full text-sm text-slate-500">
            Loading metrics…
          </p>
        ) : (
          <>
            <MetricCard label="Total Bookings" value={metrics.totalBookings} />
            <MetricCard
              label="Revenue"
              value={metrics.totalRevenue}
              suffix="INR"
            />
            <MetricCard
              label="Occupancy Rate"
              value={metrics.occupancyRate}
              suffix="%"
            />
            <MetricCard
              label="Conversion Rate"
              value={metrics.conversionRate}
              suffix="%"
            />
          </>
        )}
      </section>

      {/* Trends */}
      <section className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-[#0B0033]">
              Monthly Trends
            </h2>
            <span className="text-xs text-slate-500">{period}</span>
          </div>

          {trendsLoading ? (
            <p className="text-sm text-slate-500">Loading trends…</p>
          ) : (
            <div className="space-y-3">
              {trends.map((m) => (
                <div
                  key={m.month}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[#0B0033]">{m.month}</p>
                    <p className="text-xs text-slate-500">
                      Bookings: {m.bookings} • Avg Rate: {m.avgRoomRate}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#0B0033]">
                    ₹{m.revenue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent bookings */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-[#0B0033]">
              Recent Bookings
            </h2>
          </div>
          {bookingsLoading ? (
            <p className="text-sm text-slate-500">Loading bookings…</p>
          ) : (
            <ul className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <li key={b.id} className="text-sm">
                  <p className="font-medium text-[#0B0033]">
                    {b.guestName} • {b.hotelName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {b.checkIn} → {b.checkOut} • {b.roomType} •{" "}
                    {b.paymentStatus}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Bar Graph */}
      <section className="mt-6">
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0B0033]">
                Monthly Trends (Bar Graph)
              </h2>
              <p className="text-xs text-slate-500">
                Bookings and revenue for recent months.
              </p>
            </div>
            <span className="text-xs text-slate-500">{period}</span>
          </div>

          <TrendsChart trends={trends || []} loading={trendsLoading} />
        </div>
      </section>

      <section className="mt-6 grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-[#0B0033] mb-4">
            Revenue Trend
          </h2>
          <RevenueTrendChart trends={trends || []} loading={trendsLoading} />
        </div>

        {/* Booking Status */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-[#0B0033] mb-4">
            Booking Status
          </h2>
          <BookingStatusChart
            bookings={bookings || []}
            loading={bookingsLoading}
          />
        </div>
      </section>
    </div>
  );
}
