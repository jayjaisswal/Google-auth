const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
const cors = require("cors");
require("dotenv").config();
require("./config/dbconnection"); // Ensure DB connection is established


app.use(cors());
const PORT = process.env.PORT || 4000;



app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
