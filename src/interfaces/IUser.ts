export interface IUser {
  id: number;
  email: string;
  roles: Array<string>;
  username: string;
}

export interface IUserFormFields {
  username: string;
  name: string;
  surname: string;
  brand: string;
  roles: string;
  phone: string;
  email: string;
  password: string;
}

export enum Types {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_APARTMENTADMIN = 'ROLE_APARTMENTADMIN'
}

export const UserTypes = {
  [Types.ROLE_USER]: 'Kullanıcı',
  [Types.ROLE_ADMIN]: 'Admin',
  [Types.ROLE_APARTMENTADMIN]: 'Apartman Yöneticisi',
};
