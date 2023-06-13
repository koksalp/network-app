import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthStack from "./app/stacks/AuthStack";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatedStack from "./app/stacks/AuthenticatedStack";

function Navigation() {
  const ctx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {ctx.userState.isSignedIn ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  return <Navigation />;
}
export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
