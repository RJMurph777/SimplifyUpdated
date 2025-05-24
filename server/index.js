const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Default root route to confirm backend is working
app.get('/', (req, res) => {
  res.send('🎉 Simplify backend is working and deployed!');
});

// API endpoint for tasks
app.get('/tasks', (req, res) => {
  res.json([
    { title: "Follow up with Walmart buyer", status: "In Progress" },
    { title: "Reply to Zappo Candy lead", status: "New" },
    { title: "Book onboarding call with new brand", status: "Complete" }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
