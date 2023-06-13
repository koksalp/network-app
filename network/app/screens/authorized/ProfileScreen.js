import { View, Text, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function ProfileScreen() { 
  const ctx = useContext(AuthContext);

  return (
    <View>
      <Text > profile page </Text> 
    </View>
  );
}
