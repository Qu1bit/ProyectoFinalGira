import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
  ScrollView,
} from 'react-native';

// Propiedades del botón personalizado (sin cambios)
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
}

/**
 * Botón reutilizable con soporte para variantes, estado deshabilitado
 * y feedback visual al presionar (scale + opacidad).
 * Conserva props y lógica original.
 */
export default function CustomButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}: CustomButtonProps) {
  const [pressed, setPressed] = useState(false);

  // Estilo del contenedor según variante y estado
  const buttonVariantStyle: ViewStyle =
    variant === 'primary' ? styles.primary : styles.secondary;

  const disabledContainerStyle: ViewStyle = disabled ? styles.disabledContainer : {};

  // Color de texto por variante
  const textVariantStyle: TextStyle =
    variant === 'primary' ? styles.primaryText : styles.secondaryText;

  // Estilo dinámico cuando está presionado (ligero scale y menor opacidad)
  const pressFeedbackStyle: ViewStyle = pressed && !disabled
    ? { transform: [{ scale: 0.98 }], opacity: 0.9 }
    : {};

  // Evita ejecutar onPress si está deshabilitado
  const handlePress = (e: GestureResponderEvent) => {
    if (!disabled) {
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      style={[
        styles.base,
        styles.shadow,            // iOS shadow
        buttonVariantStyle,       // variante (bg/borde)
        disabledContainerStyle,   // estado deshabilitado
        pressFeedbackStyle,       // feedback al presionar
      ]}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={title}
    >
      <Text
        style={[
          styles.baseText,
          textVariantStyle,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Contenedor base
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    // Android elevation
    elevation: 2,
  },

  // Sombra iOS (combinada con elevation para Android)
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  // Variantes
  primary: {
    backgroundColor: '#4A90D9', // Azul principal
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4A90D9',
  },

  // Texto
  baseText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#4A90D9',
  },

  // Disabled (botón + texto)
  disabledContainer: {
    opacity: 0.6,
  },
  disabledText: {
    // mantiene el color de variante pero baja el contraste ligeramente
    // si quieres, puedes forzar gris:
    // color: '#B0BEC5',
  },
});
