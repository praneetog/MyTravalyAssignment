Hotel Booking Analytics Dashboard :

- Dashboard :

- Displays overall metrics :
-- Total bookings
-- Total revenue
-- Occupancy rate
-- Conversion rate

- Bookings Detail :
-- Monthly bookings and revenue trends list
-- Recent bookings section

- Interactive charts:
-- Bar chart for bookings vs revenue
-- Line chart for revenue trend
-- Pie chart for booking status distribution

- Bookings Page :

- Fetches booking data from the API and caches it using React Query
- Filters applied on the client without additional API calls:
- Booking status: all, confirmed, pending, cancelled
- Payment status: all, paid, pending
- Amount range: below 10k, 10k–20k, above 20k


- Displays booking details including:
  
-- Guest name
-- Hotel name
-- Check-in and check-out dates
-- Amount
-- Booking status and payment status

- Data Handling :

-- Cached API responses with React Query
-- Persistent caching on page reload for better performance
-- Re-fetching only when server parameters change (days or sorting)
-- Client-side filtering for UI-based filters such as payment and amount

- UI : 

-- Sidebar layout for navigation
-- Responsive pages and charts
-- Minimal styling using Tailwind CSS
-- Clear and simple view for monitoring booking data
