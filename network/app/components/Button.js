import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
export default function Button({ title, onPressFn, isLoading , containerStyle, }) {
  if (isLoading) {
    return (
      <View style={[styles.container, containerStyle ]}>
        <ActivityIndicator size="large" color="#fff"/>
      </View>
    );
  }
  return (
    <Pressable style={[styles.container, containerStyle ]} onPress={onPressFn}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", 
    height: 50, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0077B5",
    paddingVertical: 10, 
    borderRadius: 20,
    marginVertical: 15,
  }, 
  text: {
    fontSize: 20, 
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});
