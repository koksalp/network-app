import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
export default function SearchInput({ onChangeText, value , onResetInput, placeholder, }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Ionicons name="search" size={24} color="black" />
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value} 
        placeholder={placeholder}
      />
      <Pressable style={({pressed}) => [styles.resetIcon, pressed && styles.pressed ]} onPress={onResetInput } >
        <FontAwesome name="remove" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 6,
    paddingHorizontal: 6, 
  },
  searchIcon: {
    marginRight: 6,
  },
  resetIcon: {
    marginLeft: 6,
  }, 
  pressed: {
    opacity: 0.5,  
  }
});
