import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import appConfig from "./config/app_config.js";
import { ErrorHandler, LogError } from "./middlewares/ErrorsHandler.js";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: appConfig.cors,
    credentials: true,
  })
);

app.use(express.json());

routes(app);
 

app.use(LogError);
app.use(ErrorHandler);

app.listen(appConfig.port, () => {
  console.log(`Server is running on: ${appConfig.url}`);
});
