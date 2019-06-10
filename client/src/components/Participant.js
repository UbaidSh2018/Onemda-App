import React, { Component } from 'react'

class Participant extends Component {
  render() {
    return (
      <div className="participantList__participant">
        {this.props.participant.participantId} ({this.props.participant.participantName})
      </div>
    )
  }
}

export default Participant