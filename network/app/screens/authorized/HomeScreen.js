import { View, Text, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function HomeScreen() { 
  const ctx = useContext(AuthContext);

  return (
    <View>
      <Text > home page </Text> 
    </View>
  );
}
