const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const verifyUserToken = require("./middleware/authMiddleware");
const sweetRoutes = require("./routes/sweetRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (req: any, res: any) => {
  res.send("Sweet Shop Backend Running!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get("/api/protected-test", verifyUserToken, (req: any, res: any) => {
  res.json({
    message: "You accessed protected route",
    user: req.currentUser
  });
});


