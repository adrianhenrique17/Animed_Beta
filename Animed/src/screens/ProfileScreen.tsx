import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../lib/firebaseConfig";
import PrimaryButton from "../components/PrimaryButton";
import { useTheme } from "../components/ThemeContext";
import { theme } from "../lib/theme";
import { updateProfile } from "firebase/auth";

// IMPORTAÇÃO CORRETA DAS IMAGENS
import claroWallpaper from "../img/claro.png";
import escuroWallpaper from "../img/escuro.png";

export default function ProfileScreen() {
  const navigation: any = useNavigation();
  const [user, setUser] = useState(auth.currentUser);
  const [uploading, setUploading] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const { theme: appTheme, toggleTheme } = useTheme();

  // Listener do Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setPhotoUri(firebaseUser?.photoURL || null);
    });

    return () => unsubscribe();
  }, []);

  // Selecionar foto
  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para selecionar uma foto."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const source = result.assets[0];

      if (source.uri) {
        setUploading(true);
        try {
          if (user) {
            await updateProfile(user, { photoURL: source.uri });
            setPhotoUri(source.uri);
            Alert.alert("Sucesso", "Foto de perfil atualizada!");
          }
        } catch (e) {
          console.log("Erro ao atualizar foto:", e);
          Alert.alert("Erro", "Não foi possível salvar a foto.");
        } finally {
          setUploading(false);
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors[appTheme].background },
      ]}
    >
      {/* HEADER */}
      <View
        style={[
          styles.mainHeader,
          { backgroundColor: theme.colors[appTheme].primaryDark },
        ]}
      >
        <Text
          style={[styles.headerTitle, { color: theme.colors[appTheme].textPerfil }]}
        >
          Meu Perfil
        </Text>

        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons
            name={appTheme === "dark" ? "sunny-outline" : "moon-outline"}
            size={24}
            color={theme.colors[appTheme].textPerfil}
          />
        </TouchableOpacity>
      </View>

      {/* WALLPAPER */}
      <ImageBackground
        source={appTheme === "dark" ? escuroWallpaper : claroWallpaper}
        style={styles.headerBackground}
      >
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={[
              styles.profileImageContainer,
              { backgroundColor: theme.colors[appTheme].surface },
            ]}
            onPress={handleChoosePhoto}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator
                size="large"
                color={theme.colors[appTheme].primary}
              />
            ) : photoUri ? (
              <Image
                style={[
                  styles.profileImage,
                  { borderColor: theme.colors[appTheme].surface },
                ]}
                source={{ uri: photoUri }}
              />
            ) : (
              <Ionicons
                name="person"
                size={80}
                color={theme.colors[appTheme].primary}
              />
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* INFO CARD */}
      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: theme.colors[appTheme].surface,
            borderColor: theme.colors[appTheme].border,
            shadowColor: appTheme === "dark" ? "#fff" : "#000",
          },
        ]}
      >
        <Text style={[styles.label, { color: theme.colors[appTheme].gray }]}>
          Nome
        </Text>
        <Text style={[styles.value, { color: theme.colors[appTheme].text }]}>
          {user?.displayName || "Nome não disponível"}
        </Text>

        <View
          style={[
            styles.separator,
            { backgroundColor: theme.colors[appTheme].border },
          ]}
        />

        <Text style={[styles.label, { color: theme.colors[appTheme].gray }]}>
          E-mail
        </Text>
        <Text style={[styles.value, { color: theme.colors[appTheme].text }]}>
          {user?.email || "E-mail não disponível"}
        </Text>
      </View>

      {/* BOTÃO SAIR */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Sair"
          onPress={async () => {
            await auth.signOut();
            navigation.replace("Login");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  themeToggle: {
    position: "absolute",
    right: 20,
    padding: 5,
  },
  headerBackground: {
    height: 250,
    alignItems: "center",
    resizeMode: "cover",
  },
  profileSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
    resizeMode: "cover",
    borderWidth: 2,
  },
  infoCard: {
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: { fontSize: 14 },
  value: { fontSize: 16, fontWeight: "600", marginTop: 4, marginBottom: 10 },
  separator: { height: 1, marginVertical: 10 },
  buttonContainer: { paddingHorizontal: 16, marginTop: 30 },
});
