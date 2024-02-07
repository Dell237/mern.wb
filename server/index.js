const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/users");
const getDealsRouter = require("./routes/getDeals");
const dealeRouter = require("./routes/deales");
const likesRouter = require("./routes/likes");
const refreshingRouter = require("./routes/refresh");
const auth = require("./middleware/verifyJWT");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const credentials = require("./middleware/credentials");
const corsOptions = require("./middleware/corsOptions");

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());
app.use("/api/v1/auth", refreshingRouter);
app.use("/api/v1", getDealsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/all", auth, dealeRouter);
app.use("/api/v1/all", auth, likesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err));
