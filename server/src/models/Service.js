import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the Service Schema.
const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {collection: 'services', timestamps:true});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;