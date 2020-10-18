require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from 'compression';
import helmet from "helmet";
import cors from "cors";
import { usersRoute } from "./routes/users";
import { errorHandler, requestLimiter, badRequestHandler } from "./middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(requestLimiter);

app.get('/users', usersRoute);

app.all('*', badRequestHandler);

app.use(errorHandler);

app.listen(port);