import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Input({ placeholder, isPassword, style, handleTextChange, value, multiline, numberOfLines, }) { 
  return (
    <TextInput
      style={[styles.textInput, !!multiline && styles.textArea, style ]}
      placeholder={placeholder ? placeholder : "Type something..."}
      secureTextEntry={isPassword ? true : false}
      placeholderTextColor="black" 
      onChangeText={(text) => handleTextChange(text)} 
      value={value} 
      multiline={!!multiline } 
      numberOfLines={numberOfLines === undefined ? 1 : numberOfLines } 
      maxLength={500 }  
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  }, 
  textArea: {
    textAlignVertical: "top", 
    maxHeight: 200, 
  }
});
