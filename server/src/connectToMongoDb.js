import mongoose from "mongoose";

export default (uri) => {
  mongoose.connect(
    uri,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
};
