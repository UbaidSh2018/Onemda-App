//@flow
import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './styles.scss'
import { FeedbackFormRender } from './FeedbackFormRender';


const FEEDBACK_QUERY = gql`
  query activities {
    activities {
      id
      name
    }
    participants {
      id 
      name
      roles
    }
  }
`

const CREATE_FEEDBACK_MUTATION = gql`
mutation createFeedback(
  $activityID: String!
  $participantID: String!
  $participantFeedback: FeedbackRating!
  $trainerFeedback: TrainerFeedbackInput!
  $comment: String
) {
  createFeedback(
   activityID: $activityID,
   participantID: $participantID,
   participantFeedback: $participantFeedback,
   trainerFeedback: $trainerFeedback,
   comment: $comment
  ) {
    id
  }
}
`

export default function () {

  return (<Query query={FEEDBACK_QUERY}>
    {({ error, loading, data }) => {
      if (loading) return <div>Fetching data...</div>
      if (error) return <div>Error</div>
      const activities = data.activities;
      const participants = data.participants;

      return (

        <Mutation
          mutation={CREATE_FEEDBACK_MUTATION}
          onCompleted={() => {
          }}
        >
          {(feedback, { loading, error, data }) => {
            return (
              <div>
                <FeedbackFormRender
                  feedback={feedback}
                  activities={activities}
                  users={participants}
                  initialValues={{
                    participants: [],
                    feedback: {}
                  }} />
                {loading && <div className="notification">Submitting...</div>}
                {data && <div className="notification">Submitted</div>}
                {error && <div className="notification">Error</div>}

              </div>

            )
          }}
        </Mutation>
      )
    }}
  </Query>
  );

}

