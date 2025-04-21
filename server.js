const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

let state = {
  valve: "off",
  mode: "manual"
};

app.get('/status', (req, res) => {
  res.json(state);
});

app.post('/status', (req, res) => {
  const { valve, mode } = req.body;
  if ((valve === "on" || valve === "off") && (mode === "manual" || mode === "auto")) {
    state = { valve, mode };
    res.json({ message: "Updated successfully", state });
  } else {
    res.status(400).json({ error: "Invalid values" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
