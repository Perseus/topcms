import { Model as BaseModel } from 'sequelize';

/**
 * Have to define all DB model types here to enable typing for models that can't import other models without causing circular dependencies
 */
export class Author extends BaseModel {
   id: number;
   name: string;
}

export class Account extends BaseModel {
   act_id: number;
   act_name: string;
   gm: number;
   cha_ids: string;
   last_ip: string;
   password: string;
}

export class User extends BaseModel {
   id: number;
   name: string;
   password: string;
   originalPassword: string;
   email: string;
   login_status: number;
   last_login_time: Date;
   last_login_ip: string;
   last_login_mac: string;
   ban: number;
}
