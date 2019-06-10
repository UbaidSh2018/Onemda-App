import React, { Component } from 'react'
import Participant from './Participant'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const PARTICIPANTS_QUERY = gql`
  {
    participants {
      participantId
      participantName
    }
  }
`

class Participants extends Component {
  render() {
    return (
      <Query query={PARTICIPANTS_QUERY}>
        {({loading, error, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>

          const participants = data.participants
          return (
            <div className="participantList__participants">
              Participants
              {participants.map(participant => <Participant key={participant.participantId} participant={participant} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Participants