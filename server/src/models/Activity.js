import mongoose from "mongoose"

const Schema = mongoose.Schema

const ActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Service',
    required: true
  }
}, {collection: "activities", timestamps: true})

const Activity = mongoose.model("Activity", ActivitySchema)

export default Activity