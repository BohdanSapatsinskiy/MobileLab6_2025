import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from "../firebase";
import { AuthContext } from '../AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setAge(data.age);
        setCity(data.city);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedData = {};
      if (name.trim() !== '') updatedData.name = name;
      if (age.trim() !== '') updatedData.age = age;
      if (city.trim() !== '') updatedData.city = city;

      if (Object.keys(updatedData).length === 0) {
        Alert.alert('Введіть хоча б одне значення для оновлення');
        return;
      }

      await updateDoc(doc(db, 'users', user.uid), updatedData);
      Alert.alert('Профіль оновлено');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };


  const handleDelete = async () => {
    if (!password) {
      Alert.alert('Введи пароль для підтвердження');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    } catch (error) {
      Alert.alert('Помилка при видаленні', error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Імʼя:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Вік:</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text>Місто:</Text>
      <TextInput value={city} onChangeText={setCity} />
      <Button title="Оновити профіль" onPress={handleUpdate} />
      <Button title="Вийти" onPress={handleLogout} />

      <View style={{ marginTop: 40 }}>
        <Text>Підтверди пароль для видалення акаунта:</Text>
        <TextInput
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Видалити акаунт" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
}
