import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import { LucideHome, LucideCalendar, LucideUser } from "lucide-react-native";
import * as AuthSession from 'expo-auth-session';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./src/lib/firebaseConfig"; // Caminho corrigido

// Screens
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import VetsScreen from "./src/screens/VetsScreen";
import ServicesScreen from "./src/screens/ServicesScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import ReservationsScreen from "./src/screens/ReservationsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Lib e Hooks
import { theme } from "./src/lib/theme";
import { ReservationsProvider } from "./src/hooks/ReservationsProvider";
import { ThemeProvider, useTheme } from "src/components/ThemeContext"; // Ajuste o caminho se necessário

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const { theme: appTheme } = useTheme();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors[appTheme].primary },
        headerTintColor: theme.colors[appTheme].text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="VetsList" component={VetsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Services" component={ServicesScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

function MainTabs() {
  const { theme: appTheme } = useTheme();

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors[appTheme].surface,
          borderTopColor: theme.colors[appTheme].border,
        },
        tabBarActiveTintColor: theme.colors[appTheme].primary,
        tabBarInactiveTintColor: theme.colors[appTheme].gray,
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") return <LucideHome color={color} size={20} />;
          if (route.name === "Calendar") return <LucideCalendar color={color} size={20} />;
          if (route.name === "Profile") return <LucideUser color={color} size={20} />;
          return <View />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Calendar" component={ReservationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const redirectUri = AuthSession.makeRedirectUri({ scheme: "animed" });
    console.log("Redirect URI (Expo Go / Web / Standalone):", redirectUri);
  }, []);

  return (
    <SafeAreaProvider>
      <Toaster />
      <ReservationsProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </ReservationsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});