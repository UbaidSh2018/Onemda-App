import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import expressGraphQL from "express-graphql";
import jwt from "express-jwt";

require('dotenv').config();

import connectToMongoDb from "./connectToMongoDb";
import schema from "./graphql/";

const PORT = process.env.PORT || "4000";
const app = express();
const db = process.env.DB_URL;

connectToMongoDb(db);

const auth = jwt({
  secret: process.env.JWT_TOKEN,
  credentialsRequired: false
})

app.use(
  "/graphql",
  cors('*'),
  bodyParser.json(),
  auth,
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    context: {
      user: req.user
    }
  }))
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
