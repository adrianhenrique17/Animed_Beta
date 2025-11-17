import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useReservations } from "../hooks/ReservationsProvider";
import { theme } from "../lib/theme";
import { useTheme } from "../components/ThemeContext"; 

// Importações dos ícones
import { FontAwesome5 } from '@expo/vector-icons';

export default function ReservationsScreen() {
  const { reservations, removeReservation } = useReservations();
  const { theme: appTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors[appTheme].background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors[appTheme].primaryDark }]}>
          Minhas Reservas
        </Text>
        
        <View style={[styles.titleSeparator, { backgroundColor: theme.colors[appTheme].border }]} />

        <FlatList
          data={reservations}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.colors[appTheme].surface }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.vet, { color: theme.colors[appTheme].textPrimary }]}>
                  Consulta - {item.vetName}
                </Text>
                <Text style={[styles.service, { color: theme.colors[appTheme].gray }]}>
                  {item.serviceName}
                </Text>
                
                <View style={styles.infoRow}>
                  <FontAwesome5 name="calendar" size={16} color={theme.colors[appTheme].primaryDark} />
                  <Text style={[styles.date, { color: theme.colors[appTheme].gray }]}>
                    {item.dateISO}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <FontAwesome5 name="clock" size={16} color={theme.colors[appTheme].primaryDark} />
                  <Text style={[styles.time, { color: theme.colors[appTheme].gray }]}>
                    {item.time}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.cancel, { backgroundColor: theme.colors[appTheme].danger }]}
                onPress={() => removeReservation(item.id)}
              >
                <Text style={styles.cancelText}>Cancelar Reserva</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={{ color: theme.colors[appTheme].gray, marginTop: 24, textAlign: 'center' }}>
              Nenhuma reserva
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 16,
    paddingTop: 20, 
  },
  title: { 
    fontSize: theme.typography.h2, 
    fontWeight: "700", 
    textAlign: 'center',
  },
  titleSeparator: {
    height: 1,
    opacity: 0.5,
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vet: { 
    fontWeight: "700",
    fontSize: theme.typography.h3,
  },
  service: { 
    marginBottom: 8 
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  date: { 
    marginLeft: 8 
  },
  time: {
    marginLeft: 8
  },
  cancel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelText: { 
    color: "white", 
    fontWeight: "700" 
  },
});