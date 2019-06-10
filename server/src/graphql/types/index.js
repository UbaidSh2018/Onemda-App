import { mergeTypes } from "merge-graphql-schemas";

import Activity from "./Activity"
import Authentication from "./Authentication";
import CsvExtract from "./CsvExtract";
import Feedback from "./Feedback"
import Service from "./Service";
import User from "./User/";

const typeDefs = [
  Activity,
  Authentication,
  CsvExtract,
  Feedback,
  Service,
  User,
];

export default mergeTypes(typeDefs, { all: true });
