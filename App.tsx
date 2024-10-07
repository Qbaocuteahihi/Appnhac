import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import SignUp from "./app/screens/SignUp";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import MusicPlayer from "./app/screens/MusicPlayer";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Todos"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MusicPlayer"
        component={MusicPlayer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user); // user có thể là User hoặc null
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Inside" : "Login"}>
        {user ? (
          <>
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}