export interface IUser {
    id: number;
    email: string;
    roles: Array<string>;
    username: string;
}

export enum Types {
    ROLE_USER = "ROLE_USER"
}

export const UserTypes = {
    [Types.ROLE_USER]: "Kullanıcı"
} 