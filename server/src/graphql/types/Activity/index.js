export default `
  type Activity {
    id: String!,
    name: String!,
    services: [String]
  }
  type Query {
    activities: [Activity]
  }
  type Mutation {
    createActivity(name: String!, services: [String]): Activity
  }
`