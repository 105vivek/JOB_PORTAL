// api documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
// packages import
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
// file import
import connectDB from "./config/db.js";
// route import
import testRoutes from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
// import { clean } from "xss-clean/lib/xss.js";
// config
dotenv.config();
// mongodb connection
connectDB();
//  swagger api config
//swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Express job portal Application",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);
// rest object
const app = express();
// middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// routes

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);
// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(8080, () => {
  console.log(
    `Node server is running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white
  );
});
