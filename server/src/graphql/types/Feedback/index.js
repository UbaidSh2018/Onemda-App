export default `
  enum FeedbackRating {
    Low,
    Minimal,
    Average,
    High,
  }
  enum AssistanceRating {
    None,
    Low,
    High
  }
  input AssistanceFeedbackInput {
    verbal: AssistanceRating
    physical: AssistanceRating
  }
  type AssistanceFeedback {
    verbal: AssistanceRating
    physical: AssistanceRating
  }
  type TrainerFeedback {
    enjoyment: FeedbackRating!
    engagement: FeedbackRating!
    assistance: AssistanceFeedback
  }
  input TrainerFeedbackInput {
    enjoyment: FeedbackRating
    engagement: FeedbackRating
    assistance: AssistanceFeedbackInput
  }
  type Feedback {
    id: String!
    activityID: String!
    activityName: String
    trainerID: String!
    trainerName: String
    participantID: String!
    participantName: String
    participantFeedback: FeedbackRating!
    trainerFeedback: TrainerFeedback!
    comment: String!
  }
  type Query {
    feedback: [Feedback]!
  }
  type Mutation {
    createFeedback(activityID: String!, participantID: String!, participantFeedback: FeedbackRating!, trainerFeedback: TrainerFeedbackInput!, comment: String): Feedback
  }
`;