import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import "./styles.scss"

const VIEW_FEEDBACK_QUERY = gql`
  query feedback {
    feedback {
      activityID
      activityName
      comment
      trainerID
      trainerName
      participantID
      participantName
      participantFeedback
      trainerFeedback {
        engagement
        enjoyment
        assistance {
          verbal
          physical
        }
      }
    }
  }
`

class ViewParticipants extends Component {
  render() {
    return (
      <div>
        <h3>Participant Feedback</h3>
        <Query query={VIEW_FEEDBACK_QUERY}>
          {({loading, error, data }) => {
            if (loading) return <div>Fetching data...</div>
            if (error) return <div>Error</div>

            const feedback = data.feedback
            const feedbackMarkup = feedback.map(feedback => (
              <div className="feedback_container">
                <div>
                  <span>{feedback.participantName}</span>
                </div>
                <div>
                  <label>Activity Name:</label> <span>{feedback.activityName}</span>
                </div>
                <div>
                  <label>Trainer Name:</label> <span>{feedback.trainerName}</span>
                </div>
                <div>
                  <label>Participant Feedback:</label> <span>{feedback.participantFeedback}</span>
                </div>
                <div>
                  Trainer Feedback
                  <div><label>Engagement:</label> <span>{feedback.trainerFeedback.engagement}</span></div>
                  <div><label>Enjoyment:</label> <span>{feedback.trainerFeedback.enjoyment}</span></div>
                  <div>
                    Assistance
                    <div><label>Physical:</label> <span>{feedback.trainerFeedback.assistance.physical}</span></div>
                    <div><label>Verbal:</label> <span>{feedback.trainerFeedback.assistance.verbal}</span></div>
                  </div>
                </div>
                <div>
                  <label>Comment: </label> <span>{feedback.comment}</span>
                </div>
              </div>
            ))
            return (
              feedbackMarkup
            )
          }}
        </Query>
      </div>
    )
  }
}

export default ViewParticipants
