import { createContext, useReducer } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const initialUserState = {
    userId: null, 
    username: null, 
    name: null, 
    email: null, 
    isSignedIn: false, 
  };

  function reducer(userState, action) {
    switch (action.type) {
      case "SIGN-IN":
        return {
          ...userState,
          userId: action.userId, 
          username: action.username, 
          name: action.name, 
          email: action.email, 
          isSignedIn: true,
        }; 
      case "SIGN-OUT": 
        return initialUserState; 
      default: 
        return userState; 
    } 
  }

  const [userState, dispatch] = useReducer(reducer, initialUserState);

  function handleUserSignIn(userId, username , name , email ) {
    dispatch({ type: "SIGN-IN", userId: userId , username: username , name: name, email: email });
  }

  function handleSignOut() {
    dispatch({type: "SIGN-OUT", }); 
  }
  return (
    <AuthContext.Provider
      value={{
        userState: userState,
        handleUserSignIn: handleUserSignIn, handleSignOut, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
