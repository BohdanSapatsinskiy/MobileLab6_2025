import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Помилка входу', error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return Alert.alert('Введи email для скидання паролю');
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Лист зі скиданням паролю надіслано');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" />
      <TextInput placeholder="Пароль" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Увійти" onPress={handleLogin} />
      <Button title="Забув пароль" onPress={handleResetPassword} />
      <Button title="Зареєструватися" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
