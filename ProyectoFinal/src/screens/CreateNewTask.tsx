import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../components/contexts/AuthContext";

/* =============================================================================
   MODAL INLINE: Selector de asignatarios (lista con búsqueda y multiselección)
   -----------------------------------------------------------------------------
   - No se crea archivo aparte: este componente vive DENTRO del mismo archivo.
   - Muestra:
       • Header con título y botón de cerrar
       • Buscador para filtrar por nombre
       • Botón "Limpiar" para deseleccionar todo
       • Lista con filas: avatar (iniciales), nombre y check si está seleccionado
   - Se controla desde la pantalla principal por medio de 'visible' (booleano)
   - La selección se maneja con 'selectedIds' + callbacks 'onToggle' y 'onClear'
   - 'colors' recibe la paleta para mantener consistencia visual
   ============================================================================ */
function AssigneePickerInline({
  visible,
  onClose,
  data,
  selectedIds,
  onToggle,
  onClear,
  colors,
}: {
  visible: boolean;  // controla si el modal se muestra
  onClose: () => void;  // callback para cerrar modal
  data: { id: string; name: string }[];  // lista completa de personas
  selectedIds: string[];  // ids actualmente seleccionados
  onToggle: (id: string) => void;  // alterna selección de un id
  onClear: () => void; // limpia todas las selecciones
  colors: {
    primary: string;
    primaryDark: string;
    accentSoft: string;
    border: string;
    text: string;
    subtext: string;
  };
}) {
  // Estado local del texto de búsqueda en el modal
  const [query, setQuery] = useState("");

  // Filtrado memorizado: evita recalcular si no cambia 'data' o 'query'
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((a) => a.name.toLowerCase().includes(q));
  }, [data, query]);

  return (
    // Modal "tipo sheet" que se desliza desde abajo
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      {/* Fondo translúcido para oscurecer el contenido detrás */}
      <View style={mpStyles.backdrop}>
        {/* Contenedor principal de la hoja del modal */}
        <View style={mpStyles.sheet}>
          {/* Header: título + botón de cierre */}
          <View style={mpStyles.header}>
            <Text style={[mpStyles.title, { color: colors.text }]}>Selecciona personas</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Buscador: lupa + input + botón para limpiar query */}
          <View style={[mpStyles.searchWrap, { borderColor: colors.border }]}>
            <Ionicons name="search" size={18} color={colors.subtext} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar por nombre…"
              placeholderTextColor="#94a3b8"
              style={mpStyles.searchInput}
              autoCapitalize="words"
            />
            {query ? (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Ionicons name="close-circle" size={18} color="#94a3b8" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Acción rápida: limpiar todas las selecciones */}
          <View style={mpStyles.quickRow}>
            <TouchableOpacity onPress={onClear} style={[mpStyles.quickBtn, { backgroundColor: colors.accentSoft }]}>
              <Text style={[mpStyles.quickText, { color: colors.primaryDark }]}>Limpiar</Text>
            </TouchableOpacity>
          </View>

          {/* Lista filtrada de personas */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={mpStyles.sep} />}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              // ¿Está seleccionado este id?
              const selected = selectedIds.includes(item.id);

              // Iniciales para el avatar (máx. 2 letras)
              const initials = item.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                // Fila: al tocar alterna la selección
                <TouchableOpacity style={mpStyles.row} activeOpacity={0.9} onPress={() => onToggle(item.id)}>
                  {/* Avatar redondo con iniciales; cambia color si está seleccionado */}
                  <View
                    style={[
                      mpStyles.avatar,
                      { backgroundColor: selected ? colors.primary : "#f1f5f9" },
                    ]}
                  >
                    <Text style={[mpStyles.avatarText, { color: selected ? "#fff" : "#0f172a" }]}>{initials}</Text>
                  </View>

                  {/* Nombre de la persona (truncado a una línea si es largo) */}
                  <Text style={[mpStyles.name, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>

                  {/* Indicador de check (relleno si está seleccionado) */}
                  <View
                    style={[
                      mpStyles.check,
                      {
                        borderColor: selected ? colors.primary : "#cbd5e1",
                        backgroundColor: selected ? colors.primary : "transparent",
                      },
                    ]}
                  >
                    {selected ? <Ionicons name="checkmark" size={16} color="#fff" /> : null}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

/* Estilos específicos del modal (sheet) */
const mpStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    justifyContent: "flex-end", // alinea la sheet al fondo
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    maxHeight: "78%", // evita que ocupe toda la altura
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  title: { fontSize: 16, fontWeight: "900" },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f8fafc",
    marginBottom: 8,
  },
  searchInput: { flex: 1, color: "#0f172a", paddingVertical: 0 },
  quickRow: { flexDirection: "row", gap: 10, marginBottom: 6 },
  quickBtn: { borderRadius: 999, paddingVertical: 6, paddingHorizontal: 10 },
  quickText: { fontWeight: "800", fontSize: 12 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  sep: { height: 1, backgroundColor: "#f1f5f9" },
  avatar: { width: 28, height: 28, borderRadius: 28, alignItems: "center", justifyContent: "center", marginRight: 10 },
  avatarText: { fontSize: 12, fontWeight: "900" },
  name: { flex: 1, fontSize: 14, fontWeight: "700" },
  check: { width: 22, height: 22, borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 1 },
});

/* =============================================================================
   PANTALLA PRINCIPAL: CreateNewTask
   -----------------------------------------------------------------------------
   - Sin ScrollView por defecto (layout compacto). Si no caben los elementos en
     equipos pequeños, podrías envolver el panel en un ScrollView.
   - Muestra:
       • Encabezado "Nueva actividad"
       • Asignar a (resumen de seleccionados + botón para abrir modal)
       • Actividad (input)
       • Descripción (textarea corto)
       • Sugerencias (chips debajo de la descripción)
       • Fechas (inicio/fin con DatePicker al tocar)
       • Acciones (Enviar / Cerrar Sesión)
   - Lógica principal:
       • Estado para campos, fechas y asignatarios
       • Validación de formulario
       • Formateo de fecha (YYYY-MM-DD)
       • Envío: construye 'payload' y llama a placeholder Redux
   ============================================================================ */
export default function CreateNewTask({ navigation }: any) {
  // Acciones de autenticación (logout)
  const { logout } = useAuth();

  // Paleta de colores memorizada (no se recalcula en re-renders)
  const COLORS = useMemo(() => ({
    bg: "#ECF2FF",
    panel: "#FFFFFF",
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    text: "#0F172A",
    subtext: "#64748B",
    hint: "#94A3B8",
    accentSoft: "#E0EAFF",
    border: "#E5E7EB",
    error: "#EF4444",
  }), []);

  /* ------------------ Estado del formulario ------------------ */
  const [clase, setClase] = useState("");   // Actividad (nombre/título)
  const [query, setQuery] = useState("");   // Descripción

  /* ------------------ Estado de fechas ------------------ */
  const [startDate, setStartDate] = useState<Date | null>(null); // fecha inicio
  const [dueDate, setDueDate] = useState<Date | null>(null);     // fecha fin
  const [showStartPicker, setShowStartPicker] = useState(false); // abrir/cerrar picker inicio
  const [showDuePicker, setShowDuePicker] = useState(false);     // abrir/cerrar picker fin

  /* ------------------ Estado de asignatarios ------------------ */
  // Lista dummy (mock); luego la podrás traer de API/Redux.
  const [assignees] = useState<{ id: string; name: string }[]>([
    { id: "u1", name: "Ana López" },
    { id: "u2", name: "Carlos Pérez" },
    { id: "u3", name: "María Gómez" },
    { id: "u4", name: "Luis Martínez" },
    { id: "u5", name: "Equipo Diseño" },
    { id: "u6", name: "Equipo QA" },
  ]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]); // ids seleccionados
  const [assigneeModal, setAssigneeModal] = useState(false);                // bandera del modal

  // Alterna la selección de un id de persona
  const toggleAssignee = (id: string) => {
    setSelectedAssignees((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  // Limpia todas las selecciones
  const clearAssignees = () => setSelectedAssignees([]);

  /* ------------------ Utilidades ------------------ */
  // Formatea la fecha como 'YYYY-MM-DD' para mostrar en inputs de solo lectura
  const fmt = (d?: Date | null) => {
    if (!d) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  // Validación general del formulario (habilita/deshabilita "Enviar")
  const isFormValid =
    clase.trim().length > 0 &&           // actividad no vacía
    !!startDate && !!dueDate &&          // ambas fechas elegidas
    (dueDate!.getTime() >= startDate!.getTime()) &&  // fin >= inicio
    selectedAssignees.length > 0;        // al menos una persona seleccionada

  /* ------------------ Handlers de DatePicker ------------------ */
  // Cambio en la fecha de inicio: normaliza hora a 00:00 y ajusta fin si quedó antes
  const onChangeStart = (_e: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShowStartPicker(false); // en Android se cierra el diálogo
    if (selected) {
      const normalized = new Date(selected);
      normalized.setHours(0, 0, 0, 0);
      setStartDate(normalized);
      // Si la fecha fin ya existe y quedó "antes", la igualamos a inicio para evitar error
      if (dueDate && dueDate.getTime() < normalized.getTime()) setDueDate(normalized);
    }
  };
  // Cambio en la fecha de fin: normaliza a final del día (23:59:59.999)
  const onChangeDue = (_e: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShowDuePicker(false);
    if (selected) {
      const normalized = new Date(selected);
      normalized.setHours(23, 59, 59, 999);
      setDueDate(normalized);
    }
  };

  /* ------------------ Placeholder para Redux (params list) ------------------ */
  // Aquí, más adelante, conectarás 'dispatch(...)' a tu slice/queue de Redux.
  const handleDispatchParamsList = (payload: any) => {
    // Ejemplo futuro:
    // dispatch(enqueueParam({ type: 'CREATE_TASK', payload, meta: { ts: Date.now() }}));
    console.log("[paramsList] payload =>", payload);
  };

  /* ------------------ Envío del formulario ------------------ */
  const sendTasks = () => {
    // Validaciones "por si acaso" (ya se validó arriba para el botón)
    if (!clase.trim()) return alert("Ingresa la actividad.");
    if (!startDate || !dueDate) return alert("Selecciona fecha inicio y fecha fin.");
    if (dueDate.getTime() < startDate.getTime()) return alert("La fecha fin no puede ser anterior a la fecha inicio.");
    if (selectedAssignees.length === 0) return alert("Selecciona al menos una persona.");

    // Construye el objeto de la tarea en un formato "backend-friendly"
    const payload = {
      owner: "Profesor",
      description: clase.trim(),
      details: query.trim(),
      createdAt: startDate.toISOString(), // ISO-8601 (UTC) ideal para API
      closedAt: dueDate.toISOString(),
      isCompleted: false,
      assignToAll: false,
      assignees: selectedAssignees,       // array de ids
    };

    // Llamada al placeholder para luego integrar con Redux
    handleDispatchParamsList(payload);

    // Navega al Dashboard pasando la tarea (como hacías antes)
    navigation.navigate("Dashboard", { newTask: payload });
  };

  /* ------------------ Subcomponente: Resumen de seleccionados ------------------ */
  // Muestra "Nadie seleccionado" o la lista de nombres en una sola línea
  const SelectedSummary = () => {
    if (selectedAssignees.length === 0) {
      return <Text style={[styles.inlineHint, { color: COLORS.hint }]}>Nadie seleccionado aún</Text>;
    }
    const names = assignees.filter((a) => selectedAssignees.includes(a.id)).map((a) => a.name);
    return (
      <Text style={[styles.inlineHint, { color: COLORS.subtext }]} numberOfLines={1}>
        Asignado a:{" "}
        <Text style={{ color: COLORS.primaryDark, fontWeight: "900" }}>{names.join(", ")}</Text>
      </Text>
    );
  };

  /* ------------------ Render principal ------------------ */
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: COLORS.bg }]}>
      {/* Panel central blanco con sombra (layout compacto sin scroll) */}
      <View style={[styles.panel, { backgroundColor: COLORS.panel }]}>
        <Text style={[styles.title, { color: COLORS.text }]}>Nueva actividad</Text>

        {/* Sección "Asignar a": Resumen + Botón para abrir la lista (modal) */}
        <View style={styles.rowHeader}>
          <Text style={[styles.sectionLabel, { color: COLORS.text }]}>Asignar a</Text>
          <View style={{ flex: 1 }} />
          <CustomButton title="Elegir" onPress={() => setAssigneeModal(true)} variant="primary" />
        </View>
        <SelectedSummary />

        {/* Actividad (input de una línea) */}
        <View style={styles.section}>
          <CustomInput
            label="Actividad"
            value={clase}
            placeholder="Ej. 'Foro de programación web'"
            onChangeText={setClase}
            type="text"
            size="sm"
          />
        </View>

        {/* Descripción (textarea corto) */}
        <View style={styles.section}>
          <CustomInput
            label="Descripción"
            value={query}
            placeholder="Describe la actividad…"
            onChangeText={setQuery}
            type="text"
            multiline
            numberOfLines={3}
            helperText="Criterios o links (opcional)"
            size="sm"
          />
        </View>

        {/* Sugerencias (debajo de la descripción, estáticas por ahora) */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: COLORS.text }]}>Sugerencias</Text>
          <Text style={[styles.hint, { color: COLORS.subtext }]}>
            Ideas relacionadas a tu descripción:
          </Text>
          <View style={styles.suggestRow}>
            <View style={[styles.suggestChip, { backgroundColor: COLORS.accentSoft }]}>
              <Text style={[styles.suggestText, { color: COLORS.primary }]}>
                Foro: ¿Qué es Programación Web?
              </Text>
            </View>
            <View style={[styles.suggestChip, { backgroundColor: COLORS.accentSoft }]}>
              <Text style={[styles.suggestText, { color: COLORS.primary }]}>
                Investigación: REST vs SOAP
              </Text>
            </View>
          </View>
          <Text style={[styles.note, { color: COLORS.hint }]}>
            * Estas sugerencias son estáticas por ahora.
          </Text>
        </View>

        {/* Fechas (inputs no editables que abren el DatePicker al tocar) */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: COLORS.text }]}>Fechas</Text>
          <View style={styles.row}>
            {/* Fecha inicio */}
            <View style={styles.col}>
              <CustomInput
                label="Inicio"
                value={startDate ? fmt(startDate) : ""}
                placeholder="Elegir"
                onChangeText={() => {}}
                pressable                // hace que el input actúe como botón
                onPress={() => setShowStartPicker(true)}
                editable={false}         // evita que salga el teclado
                size="sm"
              />
            </View>
            <View style={styles.gap} />
            {/* Fecha fin */}
            <View style={styles.col}>
              <CustomInput
                label="Fin"
                value={dueDate ? fmt(dueDate) : ""}
                placeholder="Elegir"
                onChangeText={() => {}}
                pressable
                onPress={() => setShowDuePicker(true)}
                editable={false}
                size="sm"
              />
            </View>
          </View>

          {/* DatePickers nativos (aparecen solo cuando 'show*Picker' es true) */}
          {showStartPicker && (
            <DateTimePicker
              value={startDate ?? new Date()}
              mode="date"
              display={Platform.select({ ios: "spinner", android: "calendar" })}
              onChange={onChangeStart}
            />
          )}
          {showDuePicker && (
            <DateTimePicker
              value={dueDate ?? (startDate ?? new Date())}
              mode="date"
              display={Platform.select({ ios: "spinner", android: "calendar" })}
              onChange={onChangeDue}
              minimumDate={startDate ?? undefined}  // impide elegir fin < inicio
            />
          )}
        </View>

        {/* Acciones: Enviar (deshabilitado si no válido) y Cerrar Sesión */}
        <View style={styles.actionsRow}>
          <View style={styles.actionCol}>
            <CustomButton title="Enviar" onPress={sendTasks} disabled={!isFormValid} variant="primary" />
          </View>
          <View style={styles.actionCol}>
            <CustomButton title="Cerrar Sesión" onPress={logout} variant="secondary" />
          </View>
        </View>
      </View>

      {/* Modal inline (mismo archivo): lista de personas para seleccionar */}
      <AssigneePickerInline
        visible={assigneeModal}
        onClose={() => setAssigneeModal(false)}
        data={assignees}
        selectedIds={selectedAssignees}
        onToggle={toggleAssignee}
        onClear={clearAssignees}
        colors={{
          primary: COLORS.primary,
          primaryDark: COLORS.primaryDark,
          accentSoft: COLORS.accentSoft,
          border: COLORS.border,
          text: COLORS.text,
          subtext: COLORS.subtext,
        }}
      />
    </SafeAreaView>
  );
}

/* ========================= Estilos de la pantalla ========================== */
const styles = StyleSheet.create({
  safe: { flex: 1 }, // asegura cubrir el alto total respetando áreas seguras
  panel: {
    margin: 12,
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,

    flex: 1,
    justifyContent: "flex-start", // layout en columna hacia arriba
  },

  title: { fontSize: 20, fontWeight: "900", marginBottom: 6 },

  rowHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  section: { marginTop: 10 },
  sectionLabel: { fontSize: 13, fontWeight: "800" },

  inlineHint: { fontSize: 12, marginBottom: 6 },

  // Sugerencias (chips debajo de la descripción)
  hint: { fontSize: 12, marginBottom: 10 },
  suggestRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  suggestChip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  suggestText: { fontSize: 13, fontWeight: "800" },
  note: { marginTop: 8, fontSize: 11 },

  // Grid básico para fechas (dos columnas)
  row: { flexDirection: "row" },
  col: { flex: 1 },
  gap: { width: 10 },

  // Acciones
  actionsRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  actionCol: { flex: 1 },
});
