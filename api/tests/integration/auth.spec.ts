import { createTestClient } from 'apollo-server-integration-testing';
import gql from 'graphql-tag';

import { server as graphQLServer } from '../../src/app';
import { AccountServer, GameDB } from '../../src/database';

const { query, mutate } = createTestClient( {
  apolloServer: graphQLServer
} );

const createUserMutation = gql`
  mutation createUser {
    createUser(input: {
      email: "tes234232f3afsd2431t@test.com",
      username: "t24232f33asdf234es1t",
      password: "tests"
    }) {
      code
      message
      success
      errors
      data {
        name
        email
        id
      }
    }
  }
`;

beforeAll( async() => {
  await AccountServer.sync();
  await GameDB.sync();
} );

it( 'tries stuff', async() => {
  const response = await mutate( createUserMutation );

  expect( response ).toContain( {
    data: {
      createUser: {
        success: true
      }
    }
  } );

  // expect( 2 ).toBe( 2 );
} );

// it( 'tries stuff 2', async() => {
//   const response = await mutate( createUserMutation );
//   const { createUser: createUserResponse } = response.data;

//   expect( createUserResponse.success ).toBe( true );
// } );


afterAll( async() => {
  await AccountServer.close();
  await GameDB.close();
} );
