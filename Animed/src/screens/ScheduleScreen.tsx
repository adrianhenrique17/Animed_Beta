import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
// Adicionei StackActions aqui
import { useRoute, useNavigation, StackActions } from "@react-navigation/native";
import { theme } from "../lib/theme";
import { useTheme } from "../components/ThemeContext";
import PrimaryButton from "../components/PrimaryButton";
import { useReservations } from "../hooks/ReservationsProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function ScheduleScreen() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const { addReservation } = useReservations();
  const { theme: appTheme } = useTheme();

  const today = new Date();
  const initialDate = new Date(today.getFullYear(), today.getMonth(), 1);

  const vet = route.params?.vet ?? { nome: "Veterinário", availableDays: [], availableTimes: [] };
  const service = route.params?.service ?? { name: "Consulta" };

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const monthNames = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", 
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO",
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
    setSelectedDay(null);
  };

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const emptyDays = Array(firstDayOfMonth).fill(null);
    const actualDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...emptyDays, ...actualDays];
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const isDayAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return vet.availableDays?.includes(dayOfWeek) && !isPastDate;
  };

  const isPastMonth = currentDate.getFullYear() < today.getFullYear() || 
                      (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() <= today.getMonth());

  const confirm = () => {
    if (!selectedDay || !time) {
      alert("Por favor, selecione um dia e um horário.");
      return;
    }
    const dateISO = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

    addReservation({
      vetName: vet.nome, 
      serviceName: service.name,
      dateISO,
      time: time,
    });
    
    // CORREÇÃO: Usa StackActions.replace para redefinir a navegação
    navigation.dispatch(
      StackActions.replace("Main", {
        screen: "Calendar"
      })
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors[appTheme].background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color={theme.colors[appTheme].primaryDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors[appTheme].primaryDark }]}>Fazer uma reserva</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.vetTitle, { color: theme.colors[appTheme].text }]}>{vet.nome}</Text>
        <View style={[styles.calendarCard, { 
          backgroundColor: theme.colors[appTheme].surface,
          shadowColor: appTheme === 'dark' ? '#000' : '#000',
        }]}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={goToPreviousMonth} disabled={isPastMonth}>
              <FontAwesome5 name="chevron-left" size={18} color={isPastMonth ? theme.colors[appTheme].grayLight : theme.colors[appTheme].gray} />
            </TouchableOpacity>
            <Text style={[styles.month, { color: theme.colors[appTheme].gray }]}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <FontAwesome5 name="chevron-right" size={18} color={theme.colors[appTheme].gray} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekDaysRow}>
            {WEEK_DAYS.map((day, index) => (
              <Text key={index} style={[styles.weekDayText, { color: theme.colors[appTheme].gray }]}>{day}</Text>
            ))}
          </View>

          <View style={styles.grid}>
            {days.map((d, index) => {
              const available = d !== null && isDayAvailable(d);
              const isSelected = selectedDay === d;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDay(d)}
                  disabled={!available}
                  style={[
                    styles.day,
                    d === null && styles.dayHidden,
                    available && !isSelected ? {
                        borderWidth: 1,
                        borderColor: theme.colors[appTheme].primaryDark,
                      }
                      : null,
                    available && isSelected ? {
                        backgroundColor: theme.colors[appTheme].primaryDark,
                        shadowColor: "#000",
                        shadowOpacity: 0.12,
                        elevation: 3,
                      }
                      : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !available ? styles.dayTextUnavailable : null,
                      isSelected ? styles.dayTextActive : null,
                      isSelected ? { color: 'white' } : null,
                      { color: !available ? theme.colors[appTheme].gray : theme.colors[appTheme].text }
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: theme.colors[appTheme].gray }]}>Horário</Text>
        <View style={styles.timesRow}>
          {vet.availableTimes?.map((t, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timePill,
                time === t ? styles.timePillActive : null,
                {
                  backgroundColor: time === t ? theme.colors[appTheme].primaryDark : theme.colors[appTheme].surface,
                  borderColor: appTheme === 'dark' ? theme.colors[appTheme].border : '#eee',
                },
              ]}
              onPress={() => setTime(t)}
            >
              <Text
                style={[
                  styles.timeText,
                  time === t ? styles.timeTextActive : null,
                  { color: time === t ? 'white' : theme.colors[appTheme].text },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Confirmar reserva"
          onPress={confirm}
          disabled={!selectedDay || !time}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  back: { position: "absolute", left: 16, top: 18, padding: 8 },
  headerTitle: {
    fontWeight: "800",
    fontSize: theme.typography.h2,
  },
  content: { flex: 1, padding: 16 },
  vetTitle: { fontWeight: "700", marginBottom: 12 },
  calendarCard: {
    borderRadius: 12,
    padding: 14,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  month: { fontWeight: "700", fontSize: 16 },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontWeight: 'bold',
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
  },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dayHidden: {
    opacity: 0,
  },
  dayText: {},
  dayTextActive: { fontWeight: "700" },
  dayTextUnavailable: {},
  sectionLabel: {
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "700",
  },
  timesRow: { flexDirection: "row", flexWrap: "wrap" },
  timePill: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  timePillActive: {},
  timeText: {},
  timeTextActive: { fontWeight: "700" },
  footer: { padding: 16, backgroundColor: "transparent" },
});