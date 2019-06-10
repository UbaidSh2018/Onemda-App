import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Engagement = Object.freeze({
  Low: 'Low',
  Minimal: 'Minimal',
  Average: 'Average',
  High: 'High',
})

export const AssistanceRating = Object.freeze({
  None: 'None',
  Average: 'Average',
  High: 'High'
})

const AssistanceFeedback = new Schema({
  physical: {
    type: AssistanceRating,
    required: true,
    default: AssistanceRating.None
  },
  verbal: {
    type: AssistanceRating,
    required: true,
    default: AssistanceRating.None
  }
})

const TrainerFeedbackSchema = new Schema({
  enjoyment: {
    type: Engagement,
    enum: Object.values(Engagement),
    required: true,
  },
  engagement: {
    type: Engagement,
    enum: Object.values(Engagement),
    required: true
  },
  assistance: {
    type: AssistanceFeedback,
    required: true
  }
})

const FeedbackSchema = new Schema({
  activityID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  trainerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participantFeedback: {
    type: String,
    enum: Object.values(Engagement),
    required: true
  },
  trainerFeedback: TrainerFeedbackSchema,
  comment: {
    type: String,
  },
}, {collection: 'feedback', timestamps: true})

const Feedback = mongoose.model('Feedback', FeedbackSchema)

export default Feedback