
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useProfile } from '../../context/ProfileContext';
import { useActivities } from '../../context/ActivityContext';

export default function HomeScreen() {
  const { profile } = useProfile();
  const { activities } = useActivities();

  const totalMinutes = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hello, {profile.name} 👋</Text>
      <Text style={styles.subtitle}>Welcome to SportTrack</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Activities</Text>
        <Text style={styles.value}>{activities.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total duration</Text>
        <Text style={styles.value}>{totalMinutes} minutes</Text>
      </View>

      <Text style={styles.heading}>Recent activities</Text>

      {activities.map((activity) => (
        <View key={activity.id} style={styles.activity}>
          <Text style={styles.activityTitle}>{activity.type}</Text>
          <Text>{activity.date}</Text>
          <Text>{activity.duration} min · {activity.distance} km</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F7F5',
    flexGrow: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#163A35',
    marginTop: 20,
  },
  subtitle: {
    color: '#66736F',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  label: {
    color: '#66736F',
    fontSize: 14,
  },
  value: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#16866A',
    marginTop: 6,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#163A35',
    marginTop: 16,
    marginBottom: 10,
  },
  activity: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#163A35',
  },
});
