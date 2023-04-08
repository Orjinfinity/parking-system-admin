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
  // brand: string;
  roles: string;
  phone: string;
  email: string;
  password: string;
  apartmentId: number;
  blockId: number;
  flatId: number;
}

export enum Types {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_APARTMENTADMIN = 'ROLE_APARTMENTADMIN'
}

export const UserTypes = {
  [Types.ROLE_USER]: 'Kullanıcı',
  [Types.ROLE_ADMIN]: 'Admin',
  [Types.ROLE_MODERATOR]: 'Moderatör',
  [Types.ROLE_APARTMENTADMIN]: 'Apartman Yöneticisi',
};
