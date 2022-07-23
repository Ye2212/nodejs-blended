const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const errorHandler = require("./middlewares/errorHandler");
const { engine } = require("express-handlebars");
const sendEmail = require("./services/sendEmail");

require("colors");

const envPath = path.join("_dirname", "..", "config", ".env");
dotenv.config({ path: envPath });
const app = express();

// set template engin
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./backend/views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("./backend/public"));

app.use("/api/v1", require("./routes/driversRoutes"));
app.use("/api/v1", require("./routes/authRoutes"));
// app.use("/api/v1", require("./routes/teamsRoutes"));

// app.get("/contact", (req, res) => {
//   res.send("Hello");
// });

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/", (req, res) => {
  res.render("home");
});

// app.get("/contact", (req, res) => {
//   res.render("contact", {
//     userName: "Max Churaiev",
//     msg: "Form successfully send",
//   });
// });

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", async (req, res) => {
  await sendEmail(req);

  return res.render("contact", {
    msg: "Form successfully send",
  });

  // res.send(req.body);
});

app.use((req, res) => {
  res.status(400).json({ message: "Not found" });
});

app.use(errorHandler);

const { PORT } = process.env;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on ${PORT}`.cyan);
});

// process.on("unhandledRejection", async () => {
//   try {
//     await connectDB();
//   } catch (error) {
//     console.log(`error ${error.message}`.red);
//     server.close(() => process.exit(1));
//   }
// });
