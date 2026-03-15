export type CardStatus = 'pendiente' | 'completado' | 'vencido';

export interface Card{
    owner: string;
    description?: string;
    createdAt?: Date;
    closedAt?: Date;
    isCompleted?: boolean;
}