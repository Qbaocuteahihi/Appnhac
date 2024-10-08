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
import { signInWithEmailAndPassword } from "firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import SignUp from "./SignUp";

type LoginProps = {
  navigation: StackNavigationProp<any>; // Thay 'any' bằng tên stack cụ thể nếu có
  route: RouteProp<any>; // Nếu có route props, có thể định nghĩa cụ thể
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Đăng nhập thành công", "Bạn đã đăng nhập thành công!");
      navigation.navigate("Inside");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Đăng nhập thất bại", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0eff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#99CCCC", // Màu nền trung tính
    paddingVertical: 10,
    borderRadius: 12,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#0000ff", // Màu chữ xanh dương
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    marginTop: 16,
  },
  signupLink: {
    color: "blue",
    fontWeight: "bold",
  },
});
