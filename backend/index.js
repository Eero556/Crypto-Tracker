const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/authRouter");
var cookieParser = require('cookie-parser')
require("dotenv").config();
const { APIError } = require("./error/apiError")


app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json());



//routes
app.use("/auth", authRouter);

// not found page
app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  res.send("<h1>Page not found!</h1>")
})


//server
app.listen(process.env.PORT, () => {
  console.log("Server listening on port Secret");
});