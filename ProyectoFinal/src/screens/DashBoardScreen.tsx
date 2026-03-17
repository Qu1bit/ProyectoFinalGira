//prueba de refactorizacion de TaskCard
import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask } from '../store/slices/taskSlice';
import TaskCard from '../components/task/TaskCard';
import type { Task } from '../types/task';

export default function DashBoardScreen() {
  const dispatch = useAppDispatch();

  // Si tu reducer se llama "tasks" y dentro tiene { tasks: Task[] }
  const tasks = useAppSelector((s) => s.tasks.tasks);

  // Orden opcional: primero no completadas, luego completadas; vencidas al tope
  const sorted = useMemo(() => {
    const copy = [...tasks];
    copy.sort((a, b) => {
      const aCompleted = !!a.isCompleted;
      const bCompleted = !!b.isCompleted;

      // vencidas primero (si closedAt < ahora y no completada)
      const now = Date.now();
      const aExpired = !aCompleted && a.closedAt ? new Date(a.closedAt).getTime() < now : false;
      const bExpired = !bCompleted && b.closedAt ? new Date(b.closedAt).getTime() < now : false;
      if (aExpired !== bExpired) return aExpired ? -1 : 1;

      // luego no completadas antes que completadas
      if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;

      // por fecha de creación (más nuevas primero)
      const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bCreated - aCreated;
    });
    return copy;
  }, [tasks]);

  // Sembrar una tarea de ejemplo rápidamente
  const seedOne = () => {
    dispatch(
      addTask({
        owner: 'user_demo',                 // cámbialo luego por userId autenticado
        description: 'Tarea de prueba',
        createdAt: new Date().toISOString(),
        closedAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // mañana
        isCompleted: false,
      })
    );
  };

  // Sembrar varias de ejemplo
  const seedMany = () => {
    const now = Date.now();
    const samples: Omit<Task, 'id'>[] = [
      {
        owner: 'user_demo',
        description: 'Refactorizar TaskCard',
        createdAt: new Date(now - 2 * 3600_000).toISOString(),
        closedAt: new Date(now + 2 * 3600_000).toISOString(),
        isCompleted: false,
      },
      {
        owner: 'user_demo',
        description: 'Revisar slice y selectors',
        createdAt: new Date(now - 5 * 3600_000).toISOString(),
        closedAt: new Date(now - 1 * 3600_000).toISOString(), // vencida
        isCompleted: false,
      },
      {
        owner: 'user_demo',
        description: 'Actualizar estilos',
        createdAt: new Date(now - 24 * 3600_000).toISOString(),
        closedAt: undefined,
        isCompleted: true,
      },
    ];
    samples.forEach((t) => dispatch(addTask(t)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tus tareas</Text>
        <View style={styles.actionsRow}>
          <Pressable style={[styles.smallBtn, styles.secondary]} onPress={seedOne}>
            <Text style={styles.secondaryText}>Seed 1</Text>
          </Pressable>
          <Pressable style={[styles.smallBtn, styles.secondary]} onPress={seedMany}>
            <Text style={styles.secondaryText}>Seed 3</Text>
          </Pressable>
        </View>
      </View>

      {sorted.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No hay tareas aún</Text>
          <Text style={styles.emptySubtitle}>
            Crea una con el botón "Seed" o desde CreateNewTask2.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item }) => <TaskCard {...item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 8, paddingTop: 8 },
  headerRow: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 20, fontWeight: '800', color: '#111827' },
  actionsRow: { flexDirection: 'row', gap: 8 },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#93C5FD',
    backgroundColor: '#fff',
  },
  secondary: {},
  secondaryText: { color: '#1D4ED8', fontWeight: '700' },

  emptyBox: { marginTop: 32, alignItems: 'center', paddingHorizontal: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#4B5563' },
  emptySubtitle: { fontSize: 13, color: '#6B7280', marginTop: 4 },
});
