import express from "express";

const app = express();
app.use(express.json());

app.post("/calculate-point", (req, res) => {
  const { total_purchase, current_point } = req.body;

  if (typeof total_purchase !== "number") {
    return res.status(400).json({
      success: false,
      message: "total_purchase must be a number"
    });
  }

  const existingPoint = Number(current_point) || 0;
  const earnedPoint = Math.floor(total_purchase / 500);
  const latestPoint = existingPoint + earnedPoint;

  return res.json({
    success: true,
    data: {
      total_purchase,
      point_earned: earnedPoint,
      previous_point: existingPoint,
      latest_point: latestPoint
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
