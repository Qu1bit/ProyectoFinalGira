import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface CustomInputProps {
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;

  label?: string;
  error?: string;

  multiline?: boolean;
  numberOfLines?: number;

  size?: "sm" | "md";

  // comportamiento tipo select
  pressable?: boolean;
  onPress?: () => void;

  editable?: boolean;
  isDate?: boolean;

  // 🔥 NUEVO: tipo de input
  type?: "text" | "email" | "password";
}

export default function CustomInput({
  value,
  placeholder,
  onChangeText,
  label,
  error,
  multiline = false,
  numberOfLines = 1,
  size = "md",
  pressable = false,
  onPress,
  editable = true,
  isDate = false,
  type = "text",
}: CustomInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const isEditable = pressable ? false : editable;
  const sizeStyles = size === "sm" ? smallStyles : mediumStyles;

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate && onChangeText) {
      onChangeText(selectedDate.toISOString().split("T")[0]);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, sizeStyles.label]}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={pressable || isDate ? 0.8 : 1}
        onPress={() => {
          if (isDate) setShowPicker(true);
          else if (pressable && onPress) onPress();
        }}
        style={[
          styles.inputWrapper,
          sizeStyles.wrapper,
          error
            ? styles.inputError
            : focused
            ? styles.inputFocused
            : styles.inputNormal,
        ]}
      >
        <TextInput
          style={[styles.input, sizeStyles.input, multiline && styles.textArea]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          editable={isEditable && !isDate}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? "top" : "center"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor="#90A4AE"
          pointerEvents={pressable || isDate ? "none" : "auto"}

          // 🔥 comportamiento por tipo
          secureTextEntry={type === "password"}
          keyboardType={type === "email" ? "email-address" : "default"}
          autoCapitalize={type === "email" ? "none" : "sentences"}
        />

        {/* Date Picker */}
        {showPicker && (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    color: "#374151",
    fontWeight: "600",
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    color: "#263238",
  },
  textArea: {
    minHeight: 100,
  },
  inputNormal: {
    borderColor: "#CFD8DC",
  },
  inputFocused: {
    borderColor: "#2563eb",
  },
  inputError: {
    borderColor: "#E53935",
  },
  errorText: {
    color: "#E53935",
    fontSize: 12,
  },
});

const smallStyles = StyleSheet.create({
  wrapper: { paddingVertical: 8 },
  input: { fontSize: 14 },
  label: { fontSize: 12 },
});

const mediumStyles = StyleSheet.create({
  wrapper: { paddingVertical: 12 },
  input: { fontSize: 16 },
  label: { fontSize: 14 },
});