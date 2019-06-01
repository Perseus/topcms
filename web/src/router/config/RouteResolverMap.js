import RouteNames from '../../config/RouteNames';
import { editAuthorResolver } from '../resolvers/ContentManagementResolvers';

const RouteResolverMap = {
  [ RouteNames.CONTENT_MANAGEMENT.MANAGE_AUTHORS ]: editAuthorResolver,
};

export default RouteResolverMap;
