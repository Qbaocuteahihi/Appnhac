import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type SignUpProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Đăng ký thành công", "Đã tạo tài khoản thành công!");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Đăng ký thất bại", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0eff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupText}>
            Already have an account? <Text style={styles.signupLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    margin: 12,
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#DDDDDD",
  },
  button: {
    backgroundColor: "#99CCCC",
    paddingVertical: 10,
    borderRadius: 12,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#0000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: 'center',
    marginTop: 16,
  },
  signupLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});