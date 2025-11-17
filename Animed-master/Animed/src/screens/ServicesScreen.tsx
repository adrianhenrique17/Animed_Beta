import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronLeft } from 'lucide-react-native';
import ServiceCard from "../components/ServiceCard";
import { theme } from "../lib/theme";
import { useTheme } from "../components/ThemeContext";

export default function ServicesScreen() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const { theme: appTheme } = useTheme();

  const vet = route.params?.vet ?? {
    name: "Dra. Nise da Silveira",
    especialidade: "Medicina veterinária",
    avatar: null,
    services: [],
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors[appTheme].background }]}>
      
      <View style={[styles.heroHeader, { backgroundColor: theme.colors[appTheme].primary }]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft color={theme.colors[appTheme].textPerfil} size={24} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors[appTheme].textPerfil }]}>Serviços</Text>
          </View>
        </SafeAreaView>
        
        <View style={styles.vetInfoContainer}>
          <View style={[styles.avatarWrap, { backgroundColor: theme.colors[appTheme].surface }]}>
            <Image
              source={{
                uri: vet.avatar || "https://api.a0.dev/assets/image?text=avatar&aspect=1:1",
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.vetName, { color: theme.colors[appTheme].textPerfil }]}>{vet.nome}</Text>
          <Text style={[styles.vetProf, { color: theme.colors[appTheme].textPerfil }]}>{vet.especialidade}</Text>
        </View>
      </View>

      <View style={[styles.servicesList, { backgroundColor: theme.colors[appTheme].surface }]}>
        <FlatList
          data={vet.services}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ServiceCard
              name={item.name}
              price={item.price}
              onPress={() =>
                navigation.navigate("Schedule", { vet, service: item })
              }
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroHeader: {},
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 12,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  vetInfoContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  vetName: { fontWeight: "800", fontSize: theme.typography.h2 },
  vetProf: { marginTop: 4, opacity: 0.95 },
  servicesList: {
    flex: 1,
    marginTop: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
});