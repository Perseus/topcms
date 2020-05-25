import { createTestClient } from 'apollo-server-integration-testing';
import faker from 'faker';
import { mocked } from 'ts-jest/utils';
import { EmptyResultError } from 'sequelize/types';
import type { ExpressParams } from '../../src/types/external';

import { authMiddleware } from '../../src/helpers/authHelpers';
import { isAuthenticatedDirective } from '../../src/graphql/directives/auth';
import { server as graphQLServer } from '../../src/app';
import { AccountServer, GameDB } from '../../src/database';
import {
  CREATE_COMMERCE_CATEGORY, CREATE_COMMERCE_ITEM, CREATE_USER, GET_USER, ADD_MALL_POINTS, PURCHASE_MALL_ITEM, GET_COMMERCE_ITEM, GET_STORAGE_BOX
} from '../utils/queries';


jest.mock( '../../src/helpers/authHelpers' );
jest.mock( '../../src/graphql/directives/auth' );

const mockedAuthMiddleware = mocked( authMiddleware, true );
mockedAuthMiddleware.mockImplementation( ( { req, res } ): ExpressParams => ( { req, res } ) );

const mockedAuthDirective = mocked( isAuthenticatedDirective, true );
mockedAuthDirective.mockImplementation( next => next() );


const { query, mutate, setOptions } = createTestClient( {
  apolloServer: graphQLServer
} );


const userData = {
  username: faker.name.findName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
};

const commerceCategoryData = {
  id: 0,
  name: faker.random.word(),
};

const commerceItemData = {
  itemId: 681,
  price: faker.random.number( {
    min: 0,
    max: 100,
    precision: 1,
  } ),
  availableQuantity: faker.random.number( {
    min: 5,
    max: 100,
    precision: 1
  } ),
  categoryId: commerceCategoryData.id,
  mallType: 'MALL'
};

const state = {
  user: {},
  createdMallItem: {},
  createdAwardCenterItem: {},
};


describe( 'PurchaseItem API -> ', () => {
  beforeAll( async() => {
    const { data: { createUser } } = await mutate( CREATE_USER, {
      variables: {
        input: {
          ...userData,
        }
      }
    } );

    state.user = createUser.data;

    setOptions( {
      request: {
        user: {
          id: state.user.id
        }
      }
    } );

    const { data: { createCommerceCategory } } = await mutate( CREATE_COMMERCE_CATEGORY, {
      variables: commerceCategoryData
    } );

    commerceCategoryData.id = createCommerceCategory.data.id;
    commerceItemData.categoryId = commerceCategoryData.id;

    const { data: { createCommerceItem } } = await mutate( CREATE_COMMERCE_ITEM, {
      variables: commerceItemData,
    } );

    state.createdMallItem = createCommerceItem.data;
  } );

  it( 'can add mall points to user', async() => {
    const { data: { filteredUser } } = await query( GET_USER, {
      variables: {
        id: state.user.id
      }
    } );

    expect( filteredUser.data.mallPoints ).toBe( 0 );

    const { data: { addMallPoints } } = await mutate( ADD_MALL_POINTS, {
      variables: {
        id: state.user.id,
        type: 'MALL',
        numPoints: commerceItemData.price,
      }
    } );

    expect( addMallPoints.data.mallPoints ).toBe( commerceItemData.price );
  } );

  it( 'can add awardCenterPoints to user', async() => {
    const { data: { filteredUser } } = await query( GET_USER, {
      variables: {
        id: state.user.id,
      }
    } );

    expect( filteredUser.data.awardCenterPoints ).toBe( 0 );

    const { data: { addMallPoints } } = await mutate( ADD_MALL_POINTS, {
      variables: {
        id: state.user.id,
        type: 'CREDIT',
        numPoints: commerceItemData.price
      }
    } );

    expect( addMallPoints.data.awardCenterPoints ).toBe( commerceItemData.price );
  } );

  it( 'deducts user mall points on purchase success', async() => {
    await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdMallItem.id,
        quantity: 1,
      }
    } );

    const { data: { filteredUser } } = await query( GET_USER, {
      variables: {
        id: state.user.id,
      }
    } );

    expect( filteredUser.data.mallPoints ).toBe( 0 );
  } );

  it( 'deducts user award center points on purchase success', async() => {
    const { data: { createCommerceItem } } = await mutate( CREATE_COMMERCE_ITEM, {
      variables: {
        ...commerceItemData,
        mallType: 'CREDIT'
      },
    } );

    state.createdAwardCenterItem = createCommerceItem.data;

    await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdAwardCenterItem.id,
        quantity: 1,
      }
    } );

    const { data: { filteredUser } } = await query( GET_USER, {
      variables: {
        id: state.user.id
      }
    } );

    expect( filteredUser.data.awardCenterPoints ).toBe( 0 );
  } );

  it( 'throws an error if user tries to purchase item without sufficient mall points', async() => {
    const { data: { purchaseCommerceItem } } = await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdMallItem.id,
        quantity: 1
      }
    } );

    expect( purchaseCommerceItem.code ).toBe( 'user.NOT_ENOUGH_POINTS' );
  } );

  it( 'throws an error if user tries to purchase item without sufficient award center points', async() => {
    const { data: { purchaseCommerceItem } } = await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdAwardCenterItem.id,
        quantity: 1
      }
    } );

    expect( purchaseCommerceItem.code ).toBe( 'user.NOT_ENOUGH_POINTS' );
  } );

  it( 'throws an error if user tries to purchase more than the quantity of items remaining', async() => {
    const { data: { purchaseCommerceItem } } = await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdMallItem.id,
        quantity: state.createdMallItem.availableQuantity + 1,
      }
    } );

    expect( purchaseCommerceItem.code ).toBe( 'itemmall.INSUFFICIENT_QUANTITY' );
  } );

  it( 'reduces the quantity of the item once the user purchases it ', async() => {
    const { data: { commerceItem } } = await query( GET_COMMERCE_ITEM, {
      variables: {
        id: state.createdMallItem.id
      }
    } );

    await mutate( ADD_MALL_POINTS, {
      variables: {
        id: state.user.id,
        type: 'MALL',
        numPoints: commerceItem.data.price
      }
    } );

    const initialQuantity = commerceItem.data.availableQuantity;

    await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdMallItem.id,
        quantity: 1
      }
    } );

    const { data: { commerceItem: newCommerceItem } } = await query( GET_COMMERCE_ITEM, {
      variables: {
        id: state.createdMallItem.id
      }
    } );

    expect( newCommerceItem.data.availableQuantity ).toBe( initialQuantity - 1 );
  } );

  it( 'adds an entry to the storage box when user purchases an item', async() => {
    await mutate( ADD_MALL_POINTS, {
      variables: {
        id: state.user.id,
        type: 'MALL',
        numPoints: ( state.createdMallItem.price * 2 )
      }
    } );

    const { data: { storageBox: initialStorageBox } } = await query( GET_STORAGE_BOX );

    await mutate( PURCHASE_MALL_ITEM, {
      variables: {
        id: state.createdMallItem.id,
        quantity: 2,
      }
    } );

    const { data: { storageBox: finalStorageBox } } = await query( GET_STORAGE_BOX );

    expect( finalStorageBox.data.items ).toContain( `${state.createdMallItem.itemId},2` );
    expect( finalStorageBox.data.items ).not.toEqual( initialStorageBox.data.items );
  } );


  afterAll( async() => {
    await AccountServer.close();
    await GameDB.close();
  } );
} );
