export default `
  type Service {
    id: String!
    name: String!
  }
  type Query {
    services: [Service]
  }
  type Mutation {
    createService (name: String!): Service
  }
`;