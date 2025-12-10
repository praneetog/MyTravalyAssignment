# 📊 Hotel Booking Analytics Dashboard

A simple dashboard to analyze hotel bookings, revenue trends, and reservation details with a clean UI.

---

## ⭐ Dashboard

### 📈 Overall Metrics

- Total bookings
- Total revenue
- Occupancy rate
- Conversion rate

### 📋 Bookings Detail

- Monthly bookings and revenue trends list
- Recent bookings section
  
### 📊 Interactive Charts

- Bar chart for bookings vs revenue
- Line chart for revenue trend
- Pie chart for booking status distribution

## 📚 Bookings Page

Fetches booking data from the API and caches it using React Query.

### 🔎 Client-Side Filters (no extra API calls)

- Booking status: all, confirmed, pending, cancelled
- Payment status: all, paid, pending
- Amount range: below 10k, 10k–20k, above 20k

### 📄 Booking Details Displayed

- Guest name
- Hotel name
- Check-in and check-out dates
- Amount
- Booking status and payment status

### 🔁 Data Handling

- Cached API responses using React Query
- Persistent caching on page reload
- Re-fetching only when server parameters change (e.g., days or sorting)
- Client-side filtering for UI-based filters such as payment and amount

### 🎨 UI

- Sidebar layout for navigation
- Responsive pages and charts
- Minimal styling using Tailwind CSS
- Clean and simple interface for monitoring booking data
