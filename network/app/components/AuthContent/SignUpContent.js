import { useContext, useState } from "react";
import { Text, StyleSheet } from "react-native";

import Button from "../Button";
import Input from "../Input";
import { AuthContext } from "../../context/AuthContext";
import {
  handleEmailValidation,
  handleNameFormat,
  handleUsernameFormat,
} from "../../helpers/functions/util";
import { signUp } from "../../helpers/functions/http";
export function SignUpContent({ handleNavigation }) {
  const ctx = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
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

  function handlePasswordConfirmChange(text) {
    setUserInput((prevState) => ({
      ...prevState,
      passwordConfirm: text,
    }));
  }

  function handleNameChange(text) {
    setUserInput((prevState) => ({
      ...prevState,
      name: text,
    }));
  }

  function handleEmailChange(text) {
    setUserInput((prevState) => ({
      ...prevState,
      email: text,
    }));
  }
  const checkPasswords = () => userInput.password === userInput.passwordConfirm;

  async function handleSignUp() {
    if (
      userInput.username.trim() === "" ||
      userInput.password === "" ||
      userInput.passwordConfirm === "" ||
      userInput.name.trim() === "" ||
      userInput.email.trim() === ""
    ) {
      alert("Credentials cannot be left empty");
      return;
    }

    const formattedName = handleNameFormat(userInput.name);

    if (formattedName === null) {
      alert("Name format for entered name is invalid");
      return;
    }

    const formattedEmail = userInput.email.trim().toLowerCase();
    const isEmailValid = handleEmailValidation(formattedEmail);

    if (!isEmailValid) {
      alert("Please enter a valid email");
      return;
    }

    const formattedUsername = handleUsernameFormat(userInput.username);
    if (formattedUsername === null) {
      alert("Username format is not valid");
      return;
    }

    const arePasswordsCorrect = checkPasswords();
    if (!arePasswordsCorrect) {
      alert("Passwords should match");
      return;
    }

    setIsLoading(true);
    await signUpAsync(formattedName, formattedEmail, formattedUsername);
    setIsLoading(false);
  }
  async function signUpAsync(formattedName, formattedEmail, formattedUsername) {
    try {
      var data = await signUp(
        formattedName,
        formattedEmail,
        formattedUsername,
        userInput.password
      );
    } catch (error) {
      alert("Something went wrong. Try again later. ");
      return;
    }

    if (!data) {
      alert("Sign up failed. Please try again ");
      return;
    }

    if (data.result) {
      ctx.handleUserSignIn(data.userId, data.username, data.name, data.email);
      return;
    }

    alert(data.message || "Sign up failed. Please try again later. ");
  }

  return (
    <>
      <Input
        placeholder="Name "
        handleTextChange={handleNameChange}
        value={userInput.name}
      />
      <Input
        placeholder="Email "
        handleTextChange={handleEmailChange}
        value={userInput.email}
      />
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
      <Input
        placeholder="Confirm Password "
        isPassword={true}
        handleTextChange={handlePasswordConfirmChange}
        value={userInput.passwordConfirm}
      />
      <Button title="Sign Up" onPressFn={handleSignUp} isLoading={isLoading} />
      <Text style={styles.text}>
        Already have an account?
        <Text style={styles.navigationText} onPress={handleNavigation}>
          Sign in!
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
