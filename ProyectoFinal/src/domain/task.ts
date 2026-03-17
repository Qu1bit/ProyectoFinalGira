//control de helpers
import type { Task, TaskStatus } from '../types/task'

export function computeStatus(task: Task, now = new Date()): TaskStatus {
  if (task.isCompleted) return 'completado';
  if (task.closedAt && now.getTime() > new Date(task.closedAt).getTime()) return 'vencido';
  return 'pendiente';
}

export function formatDate(iso?: string) {
  return iso ? new Date(iso).toLocaleDateString() : '';
}