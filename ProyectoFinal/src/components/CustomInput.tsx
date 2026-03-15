import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  type?: "text" | "email" | "password" | "number";
  error?: string;

  // --- mejoras ---
  label?: string;
  helperText?: string;
  size?: "sm" | "md";
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;

  // modo "presionable" (para abrir date pickers, etc.)
  pressable?: boolean;
  onPress?: () => void;

  // overrides de estilo (opcionales)
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  helperStyle?: any;

  // passthroughs comunes
  returnKeyType?: "done" | "next" | "go" | "search" | "send" | "none" | "previous";
  onSubmitEditing?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function CustomInput({
  value,
  placeholder,
  onChangeText,
  type = "text",
  error,
  label,
  helperText,
  size = "md",
  editable = true,
  multiline = false,
  numberOfLines,
  pressable = false,
  onPress,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  returnKeyType,
  onSubmitEditing,
  autoCapitalize,
}: CustomInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // teclado según tipo
  const keyboardType: KeyboardTypeOptions = useMemo(() => {
    if (type === "email") return "email-address";
    if (type === "number") return "numeric";
    return "default";
  }, [type]);

  // ocultar texto si password y no se muestra
  const isSecure = type === "password" && !showPassword;

  // cuando es "presionable", deshabilitamos edición para que no salga el teclado
  const effectiveEditable = pressable ? false : editable;

  // tamaños
  const sz = size === "sm" ? smallStyles : mediumStyles;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, sz.label, labelStyle]}>{label}</Text> : null}

      <TouchableOpacity
        activeOpacity={pressable ? 0.85 : 1}
        onPress={pressable ? onPress : undefined}
        style={[
          styles.inputWrapper,
          sz.wrapper,
          error ? styles.inputError : styles.inputNormal,
          focused && !error ? styles.inputFocused : undefined,
          !effectiveEditable ? styles.inputDisabled : undefined,
        ]}
      >
        <TextInput
          style={[styles.input, sz.input, inputStyle, multiline && styles.inputMultiline]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          editable={effectiveEditable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor="#90A4AE"
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={
            autoCapitalize ?? (type === "email" ? "none" : (Platform.OS === "ios" ? "sentences" : "sentences"))
          }
          // si es presionable, que no reciba toques el input, para que el touch se lo lleve el wrapper
          pointerEvents={pressable ? "none" : "auto"}
        />

        {/* Toggle ojo para password */}
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#607D8B"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {!!error ? (
        <Text style={[styles.helper, styles.errorText]}>{error}</Text>
      ) : helperText ? (
        <Text style={[styles.helper, helperStyle]}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    color: "#374151",
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
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
  inputDisabled: {
    backgroundColor: "#F3F4F6",
  },
  input: {
    flex: 1,
    color: "#263238",
  },
  inputMultiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  eyeButton: {
    padding: 6,
    marginLeft: 6,
  },
  helper: {
    color: "#6b7280",
    fontSize: 12,
    marginLeft: 2,
  },
  errorText: {
    color: "#E53935",
  },
});

// tamaños
const smallStyles = StyleSheet.create({
  wrapper: { paddingVertical: 8 },
  input: { fontSize: 14 },
  label: { fontSize: 12 },
});
const mediumStyles = StyleSheet.create({
  wrapper: { paddingVertical: 12 },
  input: { fontSize: 16 },
  label: { fontSize: 13 },
});