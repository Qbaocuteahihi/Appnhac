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
<<<<<<< HEAD
    <InsideStack.Navigator>
      <InsideStack.Screen name="Trang Chủ" component={List} />
      <InsideStack.Screen name="details" component={Details} />

    </InsideStack.Navigator>
=======
    <Stack.Navigator>
      <Stack.Screen name="My Todos" component={List} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
    </Stack.Navigator>
>>>>>>> 2c0f2cff00e368da55183083d46a278d43abd3ed
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
<<<<<<< HEAD
        {user ?
          <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}}/>
        :
        <Stack.Screen name="Login" component={Login}  options={{headerShown: false}}/>}
       </Stack.Navigator>
       </NavigationContainer> 
=======
        {user ? 
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        : 
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />}
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> 2c0f2cff00e368da55183083d46a278d43abd3ed
  );
}