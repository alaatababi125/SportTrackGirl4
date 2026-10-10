
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import { useProfile } from '../../context/ProfileContext';

export default function ProfileScreen() {
  const { profile, updateProfile, isLoaded } = useProfile();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [age, setAge] = useState(profile.age);
  const [goal, setGoal] = useState(profile.goal);

  useEffect(() => {
    if (isLoaded) {
      setName(profile.name);
      setEmail(profile.email);
      setAge(profile.age);
      setGoal(profile.goal);
    }
  }, [isLoaded, profile]);

  function saveProfile() {
    if (!name.trim()) {
      Alert.alert('Missing information', 'Please enter your name.');
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      age: age.trim(),
      goal: goal.trim(),
    });

    Alert.alert('Success', 'Your profile has been saved!');
  }

  if (!isLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#16866A" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Profile 👤</Text>
      <Text style={styles.subtitle}>Manage your personal information</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Sports goal</Text>
        <TextInput
          style={[styles.input, styles.goalInput]}
          value={goal}
          onChangeText={setGoal}
          placeholder="Example: Run 5 km every week"
          multiline
        />

        <Pressable style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>
      </View>

      <Text style={styles.note}>
        Your profile is saved locally on this device.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F3F7F5',
  },
  heading: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#163A35',
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 20,
    color: '#66736F',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  label: {
    marginBottom: 7,
    marginTop: 12,
    fontWeight: '600',
    color: '#163A35',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5E1DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#163A35',
    backgroundColor: '#FFFFFF',
  },
  goalInput: {
    minHeight: 75,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 24,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#16866A',
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 16,
    textAlign: 'center',
    color: '#66736F',
  },
});
