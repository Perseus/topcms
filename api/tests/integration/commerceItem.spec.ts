import { createTestClient } from 'apollo-server-integration-testing';
import gql from 'graphql-tag';
import faker from 'faker';
import { mocked } from 'ts-jest/utils';
import type { ExpressParams } from '../../src/types/external';

import { authMiddleware } from '../../src/helpers/authHelpers';
import { server as graphQLServer } from '../../src/app';
import { AccountServer, GameDB } from '../../src/database';
import { getCommonRequestFields } from '../../src/graphql/utils/schema';

jest.mock( '../../src/helpers/authHelpers' );

const mockedAuthMiddleware = mocked( authMiddleware, true );
mockedAuthMiddleware.mockImplementation( ( { req, res } ): ExpressParams => ( { req, res } ) );

const { query, mutate, setOptions } = createTestClient( {
  apolloServer: graphQLServer
} );

const CREATE_COMMERCE_CATEGORY = gql`
mutation createMallCategory($name: String!) {
    createCommerceCategory(name: $name) {
      ${getCommonRequestFields()}
      data {
        id
        name
        total_items   
      }
    }
  }
`;

const CREATE_COMMERCE_ITEM = gql`mutation createMallItem($itemId: Int!, $price: Float!, $availableQuantity: Int, $categoryId: Int!, $mallType: String!) {
    createCommerceItem(itemId: $itemId, price: $price, availableQuantity: $availableQuantity, categoryId: $categoryId, mallType: $mallType) {
      ${getCommonRequestFields()}
      data {
        id
        itemId
        price
        availableQuantity
        category {
          id
          name
        }
        mallType
      }
    }
  }
`;

const EDIT_COMMERCE_ITEM = gql`mutation editMallItem($id: Int!, $itemId: Int, $price: Float, $availableQuantity: Int, $categoryId: Int, $mallType: String) {
    editCommerceItem(id: $id, itemId: $itemId, price: $price, availableQuantity: $availableQuantity, categoryId: $categoryId, mallType: $mallType) {
      ${getCommonRequestFields()}
      data {
        id
        itemId
        price
        availableQuantity
        category {
          id
          name
        }
        mallType
      }
    }
  }
`;

const GET_COMMERCE_ITEM = gql`
  query getCommerceItem($id: Int!) {
    commerceItem(id: $id) {
      ${getCommonRequestFields()}
      data {
        id
        itemId
        price
        availableQuantity
        category {
          id
          name
        }
        mallType
      }
    }
  }
`;

const DELETE_COMMERCE_ITEM = gql`
  mutation deleteCommerceItem($id: Int!) {
    deleteCommerceItem(id: $id) {
      ${getCommonRequestFields()}
      data {
        id
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($input: SignUpInput!) {
    createUser(input: $input) {
        ${getCommonRequestFields()}
        data {
            name
            email
            account_details {
                access_levels
            }
        }
    }
  }
`;

const userData = {
  username: faker.name.findName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
};

const commerceCategoryData = {
  id: 0,
  name: faker.random.word(),
};


describe( 'CommerceItem API -> ', () => {
  beforeAll( async() => {
    await AccountServer.sync();
    await GameDB.sync();

    await mutate( CREATE_USER, {
      variables: {
        input: {
          ...userData,
        }
      }
    } );

    setOptions( {
      request: {
        user: {
          id: 1
        }
      }
    } );

    const response = await mutate( CREATE_COMMERCE_CATEGORY, {
      variables: commerceCategoryData
    } );

    commerceCategoryData.id = response.data.createCommerceCategory.data.id;
  } );

  it( 'creates an item mall commerce item successfully', async() => {
    const variables = {
      itemId: 681,
      price: parseFloat( faker.finance.amount( 0, 100 ) ),
      availableQuantity: faker.random.number( 100 ),
      categoryId: commerceCategoryData.id,
      mallType: 'MALL'
    };

    const { data: { createCommerceItem } } = await mutate( CREATE_COMMERCE_ITEM, {
      variables,
    } );

    expect( createCommerceItem ).toMatchObject( {
      code: 'OK',
      message: null,
      success: true,
      errors: null,
      data: {
        itemId: variables.itemId,
        price: variables.price,
        availableQuantity: variables.availableQuantity,
        mallType: variables.mallType,
        category: {
          id: variables.categoryId,
          name: commerceCategoryData.name
        }
      }
    } );
  } );

  it( 'creates an award center commerce item successfully', async() => {
    const variables = {
      itemId: 681,
      price: parseFloat( faker.finance.amount( 0, 100 ) ),
      availableQuantity: faker.random.number( 100 ),
      categoryId: commerceCategoryData.id,
      mallType: 'AWARD'
    };

    const { data: { createCommerceItem } } = await mutate( CREATE_COMMERCE_ITEM, {
      variables,
    } );

    expect( createCommerceItem ).toMatchObject( {
      code: 'OK',
      message: null,
      success: true,
      errors: null,
      data: {
        itemId: variables.itemId,
        price: variables.price,
        availableQuantity: variables.availableQuantity,
        mallType: variables.mallType,
        category: {
          id: variables.categoryId,
          name: commerceCategoryData.name
        }
      }
    } );
  } );

  it( 'edits a commerce item successfully', async() => {
    const commerceItemId = 1;

    const variables = {
      id: commerceItemId,
      itemId: 682,
      price: parseFloat( faker.finance.amount( 0, 100 ) ),
      availableQuantity: faker.random.number( 100 ),
      categoryId: commerceCategoryData.id,
      mallType: 'AWARD'
    };

    const { data: { editCommerceItem } } = await mutate( EDIT_COMMERCE_ITEM, {
      variables
    } );

    expect( editCommerceItem ).toMatchObject( {
      code: 'OK',
      message: null,
      success: true,
      data: {
        id: commerceItemId,
        itemId: variables.itemId,
        price: variables.price,
        availableQuantity: variables.availableQuantity,
        mallType: variables.mallType
      }
    } );
  } );

  it( 'throws an error if an invalid id is provided to edit commerceItem', async() => {
    const commerceItemId = 100;

    const variables = {
      id: commerceItemId,
      itemId: 682,
      price: parseFloat( faker.finance.amount( 0, 100 ) ),
      availableQuantity: faker.random.number( 100 ),
      categoryId: commerceCategoryData.id,
      mallType: 'AWARD'
    };

    const response = await mutate( EDIT_COMMERCE_ITEM, {
      variables
    } );

    expect( response ).toMatchObject( {
      data: {
        editCommerceItem: {
          code: 'itemmall.NOT_FOUND',
          success: true
        }
      }
    } );
  } );

  it( 'retrieves a commerceItem successfully', async() => {
    const variables = {
      itemId: 681,
      price: parseFloat( faker.finance.amount( 0, 100 ) ),
      availableQuantity: faker.random.number( 100 ),
      categoryId: commerceCategoryData.id,
      mallType: 'MALL'
    };

    const { data: { createCommerceItem } } = await mutate( CREATE_COMMERCE_ITEM, {
      variables,
    } );

    const { data: { commerceItem } } = await query( GET_COMMERCE_ITEM, {
      variables: {
        id: createCommerceItem.data.id
      }
    } );

    expect( commerceItem ).toMatchObject( {
      code: 'OK',
      success: true,
      message: null,
      errors: null,
      data: {
        id: createCommerceItem.data.id,
        itemId: variables.itemId,
        price: variables.price,
        availableQuantity: variables.availableQuantity,
        category: {
          id: commerceCategoryData.id,
          name: commerceCategoryData.name,
        },
        mallType: variables.mallType
      }
    } );
  } );

  it( 'deletes a commerce item successfully', async() => {
    const variables = {
      itemId: 681,
      price: parseFloat( faker.finance.amount( 0, 100 ) ),
      availableQuantity: faker.random.number( 100 ),
      categoryId: commerceCategoryData.id,
      mallType: 'MALL'
    };

    const { data: { createCommerceItem } } = await mutate( CREATE_COMMERCE_ITEM, {
      variables,
    } );

    const { data: { deleteCommerceItem } } = await mutate( DELETE_COMMERCE_ITEM, {
      variables: {
        id: createCommerceItem.data.id
      }
    } );

    expect( deleteCommerceItem ).toMatchObject( {
      code: 'OK',
      success: true,
      message: null
    } );

    const { data: { commerceItem } } = await query( GET_COMMERCE_ITEM, {
      variables: {
        id: createCommerceItem.data.id
      }
    } );

    expect( commerceItem ).toMatchObject( {
      code: 'itemmall.NOT_FOUND'
    } );
  } );


  afterAll( async() => {
    await AccountServer.close();
    await GameDB.close();
  } );
} );
