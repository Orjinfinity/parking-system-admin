export interface IRequestCall {
    isdone: boolean;
    description: string;
    userId: number;
    apartmentId?: number;
    blockId?: number;
    flatId: number;
}