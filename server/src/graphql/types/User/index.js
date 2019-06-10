export default `
  type User {
    id: String!
    name: String!
    roles: [String!]!
  }
  enum Stream {
    None,
    Enrichment,
    Living,
    Pathways,
    Leap
  }
  type Query {
    user(id: String!): User
    users: [User]
    participants: [User]
    hello: String
  }
  type Mutation {
    createUser(username: String!, name: String!, email: String, password: String!, roles: [Role!]!, stream: Stream): User
    editUser(id: String, name: String, email: String, password: String, roles: [Role]): User
    deleteUser(id: String): User
  }
`;
