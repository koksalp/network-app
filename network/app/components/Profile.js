import { View, StyleSheet, Image, Text } from "react-native";

export default function Profile({ userInfo }) {

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <View
          style={{
            backgroundColor: "black",
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.text}>@{userInfo.username}</Text>
        <Text>{userInfo.name}</Text>
        <Text>Followers: {userInfo.followers.length}</Text>
        <Text>Follows: {userInfo.follows.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 18, 
    borderRadius: 12, 
    backgroundColor: "orange",
  },
  profilePictureContainer: {
    marginRight: 24,
  },
  text: {
    fontSize: 24,
  },
});
