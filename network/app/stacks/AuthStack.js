import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import SignInScreen from "../screens/not-authorized/SignInScreen";
import SignUpScreen from "../screens/not-authorized/SignUpScreen";

const Stack = createNativeStackNavigator(); 

export default function AuthStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="sign-in" component={SignInScreen} options={{
                title: "Sign In" 
            }}/> 
            <Stack.Screen name="sign-up" component={SignUpScreen} options={{
                title: "Sign Up"  
            }}/> 
        </Stack.Navigator> 
    ); 
} 