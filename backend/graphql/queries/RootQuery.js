import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from "graphql";

import UserType from "../types/UserType";
import { AccountServer } from '../../database/models';

const RootQuery = new GraphQLObjectType( {
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve( parent, args, req ) {
        console.log( req.user );
      }
    }
  }
} );


export default RootQuery;
