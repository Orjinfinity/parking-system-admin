import { IUserRow } from "../consts";
export interface IRole {
  name: string;
}
export interface IRoleCard {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  users: Array<IUserRow>
}
