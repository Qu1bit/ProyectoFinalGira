
export type TaskStatus = 'pendiente' | 'completado' | 'vencido';

export interface Task {
  id: string;
  owner: string;
  description?: string;
  createdAt?: Date;       // ISO string
  closedAt?: Date; 
  status: TaskStatus;       // ISO string
  isCompleted?: boolean;
}