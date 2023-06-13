import { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";

import Button from "../Button";
import Input from "../Input";
import { AuthContext } from "../../context/AuthContext";
import { signIn } from "../../helpers/functions/http"; 

export function SignInContent({ handleNavigation }) {
  const ctx = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleUsernameChange(text) {
    setUserInput((prevState) => ({
      ...prevState,
      username: text,
    }));
  }

  function handlePasswordChange(text) {
    setUserInput((prevState) => ({
      ...prevState,
      password: text,
    }));
  }

  async function handleSignIn() { 
    const formattedUsername = userInput.username.trim().toLowerCase();
    if (formattedUsername === "" || userInput.password === "") {
      alert("Credentials cannot be left empty");
      return;
    }

    setIsLoading(true);
    await signInAsync(formattedUsername );
    setIsLoading(false);
  }
  async function signInAsync(formattedUsername ) {
    try {
      var data = await signIn(formattedUsername, userInput.password);
    } catch (error) {
      alert("Sign in failed. Please try again some other time. "); 
      return;
    }

    if (!data) {
      alert("Sign in failed. Please try again some other time. ");
      return;
    }

    if (data.result) {
      ctx.handleUserSignIn(data.userId, data.username, data.name, data.email);
      return;
    }

    alert("Invalid credentials");
  }

  return (
    <>
      <Input
        placeholder="Username "
        handleTextChange={handleUsernameChange}
        value={userInput.username}
      />
      <Input
        placeholder="Password "
        isPassword={true}
        handleTextChange={handlePasswordChange}
        value={userInput.password}
      />
      <Button title="Sign in" onPressFn={handleSignIn} isLoading={isLoading} />
      <Text style={styles.text}>
        Don't have an account?
        <Text style={styles.navigationText} onPress={handleNavigation}>
          Sign up!
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  navigationText: {
    color: "#0077B5",
  },
});
