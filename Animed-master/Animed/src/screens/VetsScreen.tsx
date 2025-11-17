import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';

import VetCard from "../components/VetCard";
import { theme } from "../lib/theme";
import { getVets } from "../data/api"; 
import { Logo3 } from "src/convex/_generated/assets";
import { useTheme } from "../components/ThemeContext";

export type RootStackParamList = {
  Vets: undefined;
  Services: { vet: any };
};

type VetsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Vets"
>;

export default function VetsScreen() {
  const navigation = useNavigation<VetsScreenNavigationProp>();
  const [vets, setVets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme: appTheme } = useTheme();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getVets();
      setVets(data);
      setError(null);
    } catch (err: any) {
      console.warn("[getVets] Falha ao buscar veterinários da API.", err);
      setVets([]); 
      setError("Não foi possível carregar da API. Verifique a conexão.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && vets.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors[appTheme].background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors[appTheme].primaryDark} />
        <Text style={{ textAlign: "center", marginTop: 8, color: theme.colors[appTheme].text }}>
          Carregando veterinários...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors[appTheme].background }]}>
      <View style={styles.container}>
        <View style={styles.appHeader}>
          <Image source={Logo3} style={styles.logo} />
        </View>

        <Text style={[styles.headerTitle, { color: theme.colors[appTheme].primaryDark }]}>
          Agende as consultas para o seu Pet
        </Text>

        {error && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {error}
          </Text>
        )}

        <FlatList
          data={vets}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <VetCard
              name={item.nome}
              specialty={item.especialidade}
              avatarUrl={item.avatar}
              onPress={() => navigation.navigate("Services", { vet: item })}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={fetchData} 
              tintColor={theme.colors[appTheme].primary}
            />
          }
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
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 130,
    height: 60,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});