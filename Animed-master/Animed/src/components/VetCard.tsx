import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { theme } from "../lib/theme";
import { useTheme } from "../components/ThemeContext";

export default function VetCard({
  name,
  specialty,
  avatarUrl,
  onPress,
}: {
  name: string;
  specialty: string;
  avatarUrl: string;
  onPress?: () => void;
}) {
  const { theme: appTheme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors[appTheme].surface,
          shadowColor: appTheme === "dark" ? "#fff" : "#000",
        },
      ]}
    >
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: theme.colors[appTheme].text }]}>
          {name}
        </Text>
        <Text style={[styles.specialty, { color: theme.colors[appTheme].gray }]}>
          {specialty}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors[appTheme].primaryDark }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Serviços</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.md,
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
  },
  name: {
    fontWeight: "700",
    fontSize: theme.typography.body,
  },
  specialty: {
    fontSize: theme.typography.small,
    marginTop: 2,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});