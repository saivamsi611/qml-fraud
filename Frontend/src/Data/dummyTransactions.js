// dummyTransactions.js
const dummyTransactions = [];

for (let i = 1; i <= 100; i++) {
  dummyTransactions.push({
    id: i,
    user: "U123",
    amount: (Math.random() * 1000).toFixed(2),
    status: i % 3 === 0 ? "pending" : i % 5 === 0 ? "rejected" : "approved",
  });
}

// Dynamically generate monthly growth data
export const dummyGrowth = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(0, i).toLocaleString("default", { month: "short" }), // Jan, Feb, etc.
  growth: Math.floor(Math.random() * 100) + 10, // Random growth value
}));

export default dummyTransactions;
