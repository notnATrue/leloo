require("dotenv").config();
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { usersRoute } from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/users', usersRoute);

app.all('*', async (req, res) => {
  res.json({ code: 403, message: "Forbidden"});
});

app.listen(port);