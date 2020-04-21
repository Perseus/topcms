import { Model } from 'sequelize';

/**
 * Have to define all DB model types here to enable typing for models that can't import other models without causing circular dependencies
 */
export interface Author extends Model {
   id: number;
   name: string;
}
