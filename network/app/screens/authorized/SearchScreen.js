import { View, Text, StyleSheet, TextInput } from "react-native";
import { useContext, useState } from "react";
import Button from "../../components/Button";  
import SearchInput from "../../components/SearchInput";
import { getUserByUsername } from "../../helpers/functions/http";
import Profile from "../../components/Profile";

export default function SearchScreen() {
  const [userInput, setUserInput] = useState(""); 
  const [isLoading, setIsLoading ] = useState(false); 
  const [searchedUser, setSearchedUser] = useState(null); 
  const [message, setMessage] = useState(null ); 
  function handleUserInputChange(text) { 
    setUserInput(text); 

  }

  function handleResetInput() {
    setUserInput(""); 
  } 

  async function handleSearch() {
    setIsLoading(true); 
    try { 
      await searchUser(); 
    } catch(error) {
      console.log(error); 
    }
    setIsLoading(false ); 
  } 

  async function searchUser() { 
    if (message) {
      setMessage(null); 
    } 
    const formattedUsername = userInput.trim().toLowerCase(); 

    if (formattedUsername === "") {
      alert("Please search for a valid username "); 
      return; 
    } 

    if (searchedUser && searchedUser.username === formattedUsername ) { 
      return; 
    } 

    let userObject; 
    try {
      userObject= await getUserByUsername(formattedUsername ) ; 
    } catch(error) {
      alert("Something went wrong. Please try again later. "); 
      return; 
    } 

    if (!userObject) {
      alert("Something went wrong. Please try again later. "); 
      return; 
    } 

    if (userObject.result) { 
      
      setSearchedUser(userObject.user ); 
      return; 
    } 

    if (searchedUser ) { 
      setSearchedUser(null ); 
    } 
    
    setMessage( "User not found "); 
  }
  return (
    <View style={styles.container}>
      <SearchInput onChangeText ={handleUserInputChange} value={userInput} onResetInput={handleResetInput } placeholder="Type a username..." />  
      <Button title="Search" isLoading={isLoading} onPressFn={handleSearch} containerStyle={styles.buttonStyle }/> 
      {searchedUser && <Profile userInfo={searchedUser } />} 
      {message && <Text style={styles.message }>{message} </Text >} 
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 18, 
    alignItems: "center", 
  }, 
  buttonStyle: {
    width: "50%", 
  }, 
  message: {
    fontSize: 24, 
  }
});
