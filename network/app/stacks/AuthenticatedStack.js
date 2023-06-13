import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screens/authorized/HomeScreen";
import MessageScreen from "../screens/authorized/MessageScreen";
import ProfileScreen from "../screens/authorized/ProfileScreen";
import SearchScreen from "../screens/authorized/SearchScreen";
import IconButton from "../components/IconButton";
import CreatePostScreen from "../screens/authorized/CreatePostScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home-screen"
        component={Home}
        options={({ navigation }) => ({
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <IconButton
              name="add-circle"
              onPress={() => navigation.navigate("create-new-post-screen")}
            />
          ),
        })}
      />
      <Tab.Screen
        name="search-screen"
        component={SearchScreen}
        options={{
          title: "Search Area",
          tabBarLabel: "Search",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="message-screen"
        component={MessageScreen}
        options={{
          title: "Messages",
          tabBarLabel: "Messages",
          tabBarIcon: ({ size, color }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile-screen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bottom-tabs-screen"
        component={BottomTabs}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="create-new-post-screen"
        component={CreatePostScreen}
        options={{
          presentation: "modal", 
          title: "Create A Post" 
        }}
      />
    </Stack.Navigator>
  );
}
