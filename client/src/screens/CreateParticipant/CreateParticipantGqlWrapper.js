import React from 'react';
import { CreateParticipant } from "./CreateParticipant";
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const ROLES_QUERY = gql`query{
    roles
  }`;

const CREATE_USER_MUTATION = gql`
mutation createUser(
    $firstName: String!,
    $lastName: String!,
    $role: Role!,
    $email: String
       ){
    createUser(
        firstName: $firstName,
        lastName: $lastName,
        role: $role,
        email: $email
        ) {
      id
    }
  }`;

export function CreateParticipantGqlWrapper() {

    return (<Query query={ROLES_QUERY}>
        {({ error, loading, data }) => {
            if (loading) return <div>Fetching data...</div>

            const roles = data;

            return (

                <Mutation
                    mutation={CREATE_USER_MUTATION}
                    onCompleted={() => {
                        console.log('complete')
                    }}
                >
                    {(feedback, { loading, error }) => {

                        if (error) {
                            console.log(error)
                            console.log(error)
                        }

                        return (

                            <CreateParticipant roleTypes={roles} />
                        )
                    }}
                </Mutation>
            )
        }}
    </Query>
    );

}

