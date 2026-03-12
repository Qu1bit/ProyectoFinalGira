// src/components/layout/KeyboardAwareContainer.tsx
import React, { ReactNode } from 'react';
import {
    // saber si estás en iOS o Android para elegir comportamiento.
  Platform,
  //permite cerrar el teclado con Keyboard.dismiss().
  Keyboard,
  //para definir estilos con validación y mejor perf.
  StyleSheet,
  // contenedor con scroll vertical (útil cuando el teclado reduce el área visible).
  ScrollView,
  //wrapper táctil sin feedback visual, útil para detectar un toque y cerrar el teclado.
  TouchableWithoutFeedback,
  //mueve/ajusta el layout para no tapar los inputs con el teclado.
  KeyboardAvoidingView,
  //tipo TypeScript para validar props de estilo que son de “vista/contenedor”.
  ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  /**
   * Si true, envuelve el contenido en ScrollView para pantallas pequeñas
   */
  enableScroll?: boolean;
  /**
   * Estilo del contenedor principal
   */
  style?: ViewStyle;
  /**
   * Estilo del contentContainer del ScrollView (si enableScroll=true)
   */
  contentContainerStyle?: ViewStyle;
  /**
   * Offset adicional para compensar headers (stack) o toolbars
   */
  extraKeyboardOffset?: number;
  /**
   * Forzar behavior; por defecto: ios='padding', android='height'
   */
  behavior?: 'height' | 'position' | 'padding';
};

export default function KeyboardAwareContainer({
  children,
  enableScroll = true,
  style,
  contentContainerStyle,
  extraKeyboardOffset = 0,
  behavior = Platform.OS === 'ios' ? 'padding' : 'height',
}: Props) {
  const insets = useSafeAreaInsets();

  // Compensa status bar / notch + offset manual si existe header de navegación
  const keyboardVerticalOffset = (insets.top || 0) + extraKeyboardOffset;

  const Content = enableScroll ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    // Sin ScrollView, por si no quieres scroll
    <>{children}</>
  );

  return (
    <SafeAreaView style={[styles.safe, style]}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {Content}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  flex1: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop:5,
  },
});