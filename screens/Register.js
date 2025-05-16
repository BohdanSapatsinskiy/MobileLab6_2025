import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Створюємо документ з порожнім профілем
      await setDoc(doc(db, 'users', user.uid), {
        name: '',
        age: '',
        city: '',
      });

      Alert.alert('Успішна реєстрація');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" />
      <TextInput placeholder="Пароль" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Зареєструватися" onPress={handleRegister} />
      <Button title="Вже є акаунт? Увійти" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
