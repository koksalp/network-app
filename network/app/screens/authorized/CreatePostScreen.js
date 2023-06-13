import { View, StyleSheet, Text } from "react-native"; 
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";
import { createNewPost } from "../../helpers/functions/http";

export default function CreatePostScreen() {
  const ctx = useContext(AuthContext);
  const navigation = useNavigation();
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);

  useEffect(() => {
    async function goBack() {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack(); 
        }
      }, 1000);
    }

    if (isPostCreated) {
      goBack();
    }
  }, [isPostCreated]);
  function handleTextChange(text) { 
    if (isPostCreated) {
      return; 
    }
    setPostContent(text);
  }

  function handleResetPost() { 
    if (isPostCreated) {
      return; 
    }
    setPostContent("");
  }

  async function handleConfirmPost() { 
    if (isPostCreated ) {
      return; 
    }
    const formattedPostContent = postContent.trim();

    if (formattedPostContent === "") {
      alert("No content entered ");
      return;
    }

    setIsLoading(true);
    try {
      var data = await confirmPost(formattedPostContent);
    } catch (error) {
      alert("Something went wrong. Please try again later ");
    }
    setIsLoading(false);

    if (!data) {
      alert("Something went wrong. Please try again later ");
      return;
    }

    setIsPostCreated(true);
  }

  async function confirmPost(formattedPostContent) {
    const { userId } = ctx.userState;

    try {
      var data = await createNewPost(userId, formattedPostContent);
    } catch (error) {
      alert("Something went wrong. Please try again later , ");

      return;
    }

    return data;
  }

  function handleDismiss() { 
    if (isPostCreated) {
      return; 
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Input
          placeholder="Create a new post..."
          multiline={true}
          numberOfLines={5}
          handleTextChange={handleTextChange}
          value={postContent}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Reset"
          onPressFn={handleResetPost}
          containerStyle={[styles.inputButton, styles.resetButton]}
        />
        <Button
          title="Confirm"
          onPressFn={handleConfirmPost}
          containerStyle={[styles.inputButton, styles.confirmButton]}
          isLoading={isLoading}
        />
      </View>

      <View style={styles.dismissContainer}>
        <Button
          title="Dismiss"
          onPressFn={handleDismiss}
          containerStyle={styles.dismissButton}
        />
      </View>
      {isPostCreated && (
        <View style={styles.responseTextContainer}>
          <Text style={styles.responseText}>Success </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  textArea: {
    marginTop: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  inputButton: {
    flex: 1,
  },
  resetButton: {
    backgroundColor: "red",
    marginRight: 12,
  },
  confirmButton: {
    marginLeft: 12,
    backgroundColor: "green",
  },
  dismissContainer: {
    alignItems: "center",
  },
  dismissButton: {
    marginVertical: 0,
    width: "50%",
  },

  responseTextContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.8)", 
    alignSelf: "center", 
    bottom: 100, 
    
  },
  responseText: {
    fontSize: 20,
    color: "white",
  },
});
