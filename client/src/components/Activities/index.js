import React, { Component } from 'react';
import ListItem from '../ListItem';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SERVICES_QUERY = gql`
  query activities {
    activities {
      name
    }
  }
`

class Activities extends Component {
  render() {
    return (
      <Query query={SERVICES_QUERY}>
        {({loading, error, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>

          const activities = data.activities
          return (
            <div className="services">
              <h3>Activities</h3>
              <div>Here is a list of all the activities Onemda offers.</div>
              {activities.map((activity, index) => <ListItem className='list_item' key={index} value={activity.name} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Activities
