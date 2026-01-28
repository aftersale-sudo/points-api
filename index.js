import express from "express";

const app = express();
app.use(express.json());

// health check (penting utk Render & debug)
app.get("/", (req, res) => {
  res.send("Points API is running");
});

app.post("/calculate-point", (req, res) => {
  try {
    let { total_purchase, current_point } = req.body;

    // convert string → number
    const purchase = Number(total_purchase);
    const current = Number(current_point) || 0;

    // validation
    if (isNaN(purchase)) {
      return res.status(400).json({
        success: false,
        message: "Invalid total_purchase",
        received: total_purchase
      });
    }

    // kira point
    const earnedPoint = Math.floor(purchase / 500);
    const latestPoint = current + earnedPoint;

    return res.json({
      success: true,
      data: {
        total_purchase: purchase,
        point_earned: earnedPoint,
        previous_point: current,
        latest_point: latestPoint
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Points API running on port ${PORT}`);
});

