import { View, Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SignInContent } from "../../components/AuthContent/SignInContent";
import { SignUpContent } from "../../components/AuthContent/SignUpContent";

export default function AuthScreen({ signIn }) {
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.replace(signIn ? "sign-up" : "sign-in");
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {signIn ? (
          <SignInContent handleNavigation={handleNavigation} />
        ) : (
          <SignUpContent handleNavigation={handleNavigation} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: 36,
    paddingHorizontal: 18,
    borderRadius: 36,
  },
});
