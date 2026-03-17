
export type TaskStatus = 'pendiente' | 'completado' | 'vencido';

export interface Task {
  id: string;
  owner: string;
  description?: string;
  createdAt?: string;       // ISO string
  closedAt?: string;        // ISO string
  isCompleted?: boolean;
}