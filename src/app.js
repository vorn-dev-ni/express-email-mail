import compression from "compression";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import { UserRouter } from "./routes/User.js";
import express from "express";
import notFound from "./controllers/404.js";
import { AuthRouter } from "./routes/Auth.js";
import messageRouter from "./routes/Message.js";
import { allowCrossDomain } from "./middleware/Cors.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(morgan("common"));
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
//sads
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(allowCrossDomain)
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/messages", messageRouter);
app.use((err, req, res, next) => {
  console.error("error", err);
  const errors = err.message?.trim() || err;
  return res.status(400).json({
    error: errors,
    name: err.name || 'Runtime Error',
    statusCode: err.statusCode || 400,
  });
});
app.use("*", notFound);
export default app;
// app.use(CustomMiddleware)
// define your other middleware route handler here
