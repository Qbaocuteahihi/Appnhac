import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Trang Chủ" component={List} />
      <InsideStack.Screen name="details" component={Details} />

    </InsideStack.Navigator>
  );
}
export default function App() {
  const [user, setUser] = useState< User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ?
          <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}}/>
        :
        <Stack.Screen name="Login" component={Login}  options={{headerShown: false}}/>}
       </Stack.Navigator>
       </NavigationContainer> 
  );
}
