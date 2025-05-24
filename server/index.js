const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());

app.get('/tasks', (req, res) => {
  res.json([
    { title: "Follow up with Walmart buyer", status: "In Progress" },
    { title: "Reply to Zappo Candy lead", status: "New" },
    { title: "Book onboarding call with new brand", status: "Complete" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
