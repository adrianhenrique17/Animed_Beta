import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { theme } from "../lib/theme";
import { useTheme } from "../components/ThemeContext";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  style,
  loading,
  disabled,
}: Props) {
  const { theme: appTheme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,
        style,
        { backgroundColor: disabled ? theme.colors[appTheme].gray : theme.colors[appTheme].primaryDark },
        disabled && styles.disabledButton,
      ]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: theme.typography.body,
  },
  disabledButton: {
    opacity: 0.6,
  },
});