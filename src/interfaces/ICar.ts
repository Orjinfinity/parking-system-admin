export interface ICar {
  plate: string;
  ownername: string;
  ownersurname: string;
  ownerphone: string;
  brand: string;
  model: string;
  color: string;
  isguest: boolean;
  apartmentId?: number;
  blockId?: number;
  flatId: number;
}
