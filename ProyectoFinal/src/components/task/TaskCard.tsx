import React, { useMemo, useCallback, useState } from 'react';
import TaskCardView from './TaskCardView';
import type { Task } from '../../types/task';
import { computeStatus, formatDate } from '../../domain/task';
import { useAppDispatch } from '../../store/hooks';
import { toggleComplete } from '../../store/slices/taskSlice';

type Props = Task;

const TaskCard: React.FC<Props> = (initial) => {
  const dispatch = useAppDispatch();
  const [local, setLocal] = useState<Task>(initial);
  const status = useMemo(() => computeStatus(local), [local]);

  const handleComplete = useCallback(() => {
    setLocal((t) => ({ ...t, isCompleted: true })); // feedback inmediato
    dispatch(toggleComplete({ id: initial.id }));
  }, [dispatch, initial.id]);

  return (
    <TaskCardView
      owner={local.owner}
      description={local.description}
      status={status}
      createdLabel={formatDate(local.createdAt)}
      closedLabel={formatDate(local.closedAt)}
      onComplete={handleComplete}
      canComplete={!local.isCompleted}
    />
  );
};

export default React.memo(TaskCard);