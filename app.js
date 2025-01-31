const express = require("express");
const morgan = require("morgan");
const connectDb = require("./config/db");
const AppError = require("./utils/apiError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

connectDb();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  //   const err = new Error();
  //   (err.status = "fail"), (err.statusCode = 404);
  next(new AppError(`can't find ${req.originalUrl} on this server !!!`, 404));
});

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Connected to server");
});
