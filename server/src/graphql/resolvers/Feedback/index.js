import Feedback from '../../../models/Feedback'
import Activity from '../../../models/Activity'
import User, { Role } from '../../../models/User'
import { isUserWithRole } from "../User"

const fetchByIDFromModel = async (id, model) => {
  return await model.findById(id)
}

export default {
  Query: {
    async feedback (root, args, { user }) {
      try {
        if (!user || !isUserWithRole(user, Role.Admin)) {
          throw Error('Must be a logged in Admin to access feedback')
        }
        const feedback = await Feedback.find({}).populate().exec()
        const newFeedback = await Promise.all(feedback.map(async(f) => {
          const trainer = await fetchByIDFromModel(f.trainerID, User)
          const participant = await fetchByIDFromModel(f.participantID, User)
          const activity = await fetchByIDFromModel(f.activityID, Activity)
          
          f.participantName = participant.name
          f.trainerName = trainer.name
          f.activityName = activity.name
          return f
          
        }))

        return newFeedback
      } catch(e) {
        throw Error(e)
      }
    }
  },
  Mutation: {
    async createFeedback (root, { activityID, participantID, participantFeedback, trainerFeedback, comment }, { user }) {
    
      try {
        const isUserTrainer = await isUserWithRole(user, Role.Trainer)
        if (!isUserTrainer) {
          throw Error('Must be logged in trainer to create feedback.')
        }

        // Validate activity ID
        const activity = await fetchByIDFromModel(activityID, Activity)

        // Validate participant ID
        const userP = await fetchByIDFromModel(participantID, User)

        // Ensure we are providing feedback on an actual participant
        if (!userP.roles.includes('participant')) {
          throw Error('A participant is required to give feedback on.')
        }

        const newFeedback = new Feedback({ activityID: activity._id, participantID, trainerID: user.id, participantFeedback, trainerFeedback, comment });
        return await newFeedback.save()
      } catch(e) {
        throw Error(e)
      }
    }
  }
};
