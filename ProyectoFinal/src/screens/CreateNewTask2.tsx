import React, { useMemo, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
// Hooks del store
// Con alias:
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/slices/taskSlice';
// Si NO tienes alias, usa:
// import { useAppDispatch } from '../store/hooks';
// import { addTask } from '../store/slices/taskSlice';

// Tipos (solo si quieres tipar locales)
import type { Task } from '../types/task';

export default function CreateNewTask2() {
  const dispatch = useAppDispatch();

  // Campos del formulario
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [closedAt, setClosedAt] = useState<string | undefined>(undefined);

  // Errores simples
  const [errors, setErrors] = useState<{ owner?: string; description?: string }>({});

  // Validación mínima
  const isValid = useMemo(() => {
    const e: typeof errors = {};
    if (!owner.trim()) e.owner = 'El owner es obligatorio (puede ser tu userId).';
    if (!description.trim()) e.description = 'La descripción es obligatoria.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [owner, description]);

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert('Formulario incompleto', 'Revisa los campos marcados.');
      return;
    }

    // Construye la tarea. No pasamos id: lo generará el prepare de addTask.
    dispatch(
      addTask({
        owner: owner.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
        closedAt, // puede ser undefined
        isCompleted: false,
      })
    );

    // Limpia campos o navega si quieres
    setOwner('');
    setDescription('');
    setClosedAt(undefined);
    Alert.alert('Tarea creada', 'Se agregó correctamente.');
  };

  // Helper opcional para demo: setear una fecha de cierre +1 día
  const setTomorrow = () => {
    const t = new Date(Date.now() + 24 * 60 * 60 * 1000);
    setClosedAt(t.toISOString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear nueva tarea (v2)</Text>

      <Text style={styles.label}>Owner (o userId)</Text>
      <TextInput
        placeholder="p.ej. user_123"
        value={owner}
        onChangeText={setOwner}
        style={[styles.input, !!errors.owner && styles.inputError]}
        autoCapitalize="none"
      />
      {!!errors.owner && <Text style={styles.errorText}>{errors.owner}</Text>}

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        placeholder="Escribe una descripción"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, !!errors.description && styles.inputError]}
        multiline
      />
      {!!errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Text style={styles.label}>Fecha de cierre (opcional)</Text>
      <TextInput
        placeholder="ISO: 2026-03-20T12:00:00.000Z"
        value={closedAt ?? ''}
        onChangeText={setClosedAt}
        style={styles.input}
        autoCapitalize="none"
      />
      <View style={styles.row}>
        <Pressable onPress={setTomorrow} style={[styles.smallBtn, styles.secondary]}>
          <Text style={styles.secondaryText}>Mañana +1</Text>
        </Pressable>
        <Pressable onPress={() => setClosedAt(undefined)} style={[styles.smallBtn, styles.ghost]}>
          <Text style={styles.ghostText}>Limpiar fecha</Text>
        </Pressable>
      </View>

      <Pressable onPress={handleSubmit} style={[styles.btn, styles.primary]}>
        <Text style={styles.primaryText}>Crear tarea</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16, color: '#111827' },
  label: { fontSize: 13, fontWeight: '700', color: '#374151', marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#111827',
  },
  inputError: { borderColor: '#F87171' },
  errorText: { color: '#DC2626', fontSize: 12, marginTop: 4 },

  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
  smallBtn: {
    paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },
  secondary: { backgroundColor: '#fff', borderColor: '#93C5FD' },
  secondaryText: { color: '#1D4ED8', fontWeight: '700' },
  ghost: { backgroundColor: '#fff', borderColor: '#D1D5DB' },
  ghostText: { color: '#6B7280', fontWeight: '700' },

  btn: {
    marginTop: 18, paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  primary: { backgroundColor: '#4A90D9' },
  primaryText: { color: '#fff', fontWeight: '700' },
});