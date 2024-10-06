import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import MusicPlayer from './app/screens/MusicPlayer';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Todos" component={List} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? 
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        : 
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}