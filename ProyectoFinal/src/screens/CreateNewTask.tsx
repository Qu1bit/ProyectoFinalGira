import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Task, TaskStatus } from '../types/task';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, updateTask } from '../store/slices/taskSlice';

{/*
const statusOptions: { key: TaskStatus; label: string; icon: any }[] = [
  { key: 'pending', label: 'Pendiente', icon: 'taskmark-outline' },
  { key: 'reading', label: 'En Lectura', icon: 'auto-stories' },
  { key: 'read', label: 'Leído', icon: 'check-circle' },
];
*/}


export default function AddEditTaskScreen({ route, navigation }: any) {
  const taskId = route.params?.taskbookId;
  const dispatch = useAppDispatch();
  const existingTask = useAppSelector((state) =>
    state.tasks.tasks.find((b) => b.id === taskId)
  );
  const isEditing = !!existingTask;

  const [owner, setOwner] = useState(existingTask?.owner || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status || 'pendiente');
  const [createdAt, setCreatedAt] = useState(existingTask?.createdAt || 0);
  const [closedAt, setCloseAt] = useState(existingTask?.closedAt || '');
  //const [showGenrePicker, setShowGenrePicker] = useState(false);

  const handleOnSaveTask = () => {
    if (!owner.trim() || !author.trim()){
      Alert.alert ('Campos Requeridos', 'Titulo y Autor son requeridos para guardar un libro')
      return;
    }
    const taskData: Task = {
      id: existingTask?.id || Date.now().toString(),
      title,
      author,
      genre,
      status,
      rating,
      review,
      coverImage: existingTask?.coverImage || '',
      photos: existingTask?.photos || [],
      startDate: existingTask?.startDate,
      endDate: existingTask?.endDate,
      createdAt: existingTask?.createdAt || new Date().toISOString(),
    };

    if (isEditing) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <TouchableOpacity style={styles.coverUpload} activeOpacity={0.7}>
          <View style={styles.coverPlaceholder}>
            <View style={styles.coverIconCircle}>
              <MaterialIcons name="add-a-photo" size={28} color={colors.primary} />
            </View>
            <Text style={styles.coverUploadText}>Agregar portada</Text>
            <Text style={styles.coverUploadHint}>Toca para seleccionar</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Título <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del libro"
              placeholderTextColor={colors.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Autor <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del autor"
              placeholderTextColor={colors.textLight}
              value={author}
              onChangeText={setAuthor}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Género</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowGenrePicker(!showGenrePicker)}
            >
              <View style={styles.pickerLeft}>
                <MaterialIcons name="category" size={20} color={genre ? colors.primary : colors.textLight} />
                <Text style={[styles.pickerText, !genre && { color: colors.textLight }]}>
                  {genre || 'Seleccionar género'}
                </Text>
              </View>
              <MaterialIcons
                name={showGenrePicker ? 'expand-less' : 'expand-more'}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {showGenrePicker && (
              <View style={styles.genreGrid}>
                {genres.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genreChip, genre === g && styles.genreChipActive]}
                    onPress={() => { setGenre(g); setShowGenrePicker(false); }}
                  >
                    <Text style={[styles.genreChipText, genre === g && styles.genreChipTextActive]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.statusRow}>
              {statusOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.statusChip, status === opt.key && styles.statusChipActive]}
                  onPress={() => setStatus(opt.key)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name={opt.icon}
                    size={18}
                    color={status === opt.key ? colors.white : colors.textSecondary}
                  />
                  <Text style={[styles.statusChipText, status === opt.key && styles.statusChipTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.label}>Fecha de inicio</Text>
              <TouchableOpacity style={styles.dateButton}>
                <MaterialIcons name="calendar-today" size={18} color={colors.primary} />
                <Text style={styles.dateText}>Seleccionar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.label}>Fecha de fin</Text>
              <TouchableOpacity style={styles.dateButton}>
                <MaterialIcons name="event-available" size={18} color={colors.primary} />
                <Text style={styles.dateText}>Seleccionar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Reseña</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe tu reseña o comentarios finales..."
              placeholderTextColor={colors.textLight}
              value={review}
              onChangeText={setReview}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fotos del libro</Text>
            <View style={styles.photosUploadRow}>
              <TouchableOpacity style={styles.photoUploadBtn} activeOpacity={0.7}>
                <View style={styles.photoIconCircle}>
                  <MaterialIcons name="photo-camera" size={24} color={colors.primary} />
                </View>
                <Text style={styles.photoUploadText}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoUploadBtn} activeOpacity={0.7}>
                <View style={styles.photoIconCircle}>
                  <MaterialIcons name="photo-library" size={24} color={colors.primary} />
                </View>
                <Text style={styles.photoUploadText}>Galería</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleOnSaveBook}
            activeOpacity={0.8}
          >
            <MaterialIcons name="check" size={22} color={colors.white} />
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Guardar Cambios' : 'Agregar Libro'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  coverUpload: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: colors.primary,
  },
  coverPlaceholder: {
    width: 140,
    height: 190,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  coverIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverUploadText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
  },
  coverUploadHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  field: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: colors.danger,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  pickerButton: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  pickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickerText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  genreChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genreChipText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  genreChipTextActive: {
    color: colors.white,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 6,
  },
  statusChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statusChipTextActive: {
    color: colors.white,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 12,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  dateField: {
    flex: 1,
  },
  dateButton: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  dateText: {
    fontSize: 14,
    color: colors.textLight,
  },
  photosUploadRow: {
    flexDirection: 'row',
    gap: 12,
  },
  photoUploadBtn: {
    flex: 1,
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.surface,
    gap: 8,
  },
  photoIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 8,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
