
export type TaskStatus = 'pendiente' | 'completado' | 'vencido';

export interface Task {
  id: string;
  owner: string;
  description?: string;
  createdAt?: string;       // ISO string
  closedAt?: string; 
  status: TaskStatus;       // ISO string
  isCompleted?: boolean;
}