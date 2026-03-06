import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function CreateNewTask({ navigation }: any) {
  const [clase, setClase] = useState('');
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(''); //fecha inicio
  const [dueDate, setDueDate] = useState('');     //fecha fin

  const isFormValid =
    clase.trim().length > 0 &&
    startDate.trim().length > 0 &&
    dueDate.trim().length > 0;

  const sendTasks = () => {
    if (!isFormValid) {
      Alert.alert('Faltan datos', 'Ingresa actividad, fecha inicio y fecha fin.');
      return;
    }

    const newTask = {
      owner: 'Profesor',
      description: clase.trim(),
      createdAt: new Date(startDate),
      closedAt: new Date(dueDate),
      isCompleted: false,
      assignToAll: true,
    };

    navigation.navigate('Dashboard', { newTask });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva actividad</Text>

      {/* Card 1: Actividad */}
      <View style={styles.card}>
        <Text style={styles.label}>Actividad</Text>
        <CustomInput
          value={clase}
          placeholder="Ej. 'Foro de programación web'"
          onChangeText={setClase}
          type="text"
          error={""}
        />
      </View>

      {/* Card 2: Sugerencias (siempre visible) */}
      <View style={styles.card}>
        <View style={styles.suggestionsHeader}>
          <Text style={styles.suggestionsTitle}>Sugerencias</Text>
          <Text style={styles.suggestionsHint}>
            Escribe una descripción y más adelante te sugeriré tareas relacionadas.
          </Text>
        </View>

        <CustomInput
          value={query}
          placeholder="Describe la actividad (ej. 'Foro de programación web')"
          onChangeText={setQuery}
          type="text"
          error={""}
        />

        <View style={styles.suggestionsList}>
          <Text style={styles.suggestionItem}>• Foro: ¿Qué es Programación Web?</Text>
          <Text style={styles.suggestionItem}>• Investigación: REST vs SOAP</Text>
        </View>

        <Text style={styles.note}>* Estas sugerencias son estáticas por ahora.</Text>
      </View>

      {/* Card 3: Fechas */}
      <View style={styles.card}>
        <Text style={styles.label}>Establece las Fechas</Text>
        <CustomInput
          value={startDate}
          placeholder="Fecha Inicio (YYYY-MM-DD)"
          onChangeText={setStartDate}
          type="text"
          error={""}
        />
        <CustomInput
          value={dueDate}
          placeholder="Fecha Fin (YYYY-MM-DD)"
          onChangeText={setDueDate}
          type="text"
          error={""}
        />
      </View>

      <View >
        <CustomButton
          title="Enviar Tareas"
          onPress={sendTasks}
          disabled={isFormValid}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  // card simplificada
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
  },

  // Sugerencias
  suggestionsHeader: {
    marginBottom: 8,
  },
  suggestionsTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  suggestionsHint: {
    fontSize: 12,
    color: "#6b7280",
  },
  suggestionsList: {
    marginTop: 10,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  note: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },

});