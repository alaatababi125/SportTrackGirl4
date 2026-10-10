
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useActivities } from '../../context/ActivityContext';

export default function StatisticsScreen() {
  const { activities } = useActivities();

  const totalDuration = activities.reduce(
    (sum, activity) => sum + activity.duration, 0
  );
  const totalDistance = activities.reduce(
    (sum, activity) => sum + activity.distance, 0
  );
  const totalCalories = activities.reduce(
    (sum, activity) => sum + activity.calories, 0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Statistics 📊</Text>
      <Text style={styles.subtitle}>Your sports progress at a glance</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total activities</Text>
        <Text style={styles.value}>{activities.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total duration</Text>
        <Text style={styles.value}>{totalDuration} minutes</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total distance</Text>
        <Text style={styles.value}>{totalDistance} km</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total calories</Text>
        <Text style={styles.value}>{totalCalories} kcal</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F7F5',
    flexGrow: 1,
  },
  heading: {
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
    padding: 22,
    borderRadius: 16,
    marginBottom: 14,
  },
  label: {
    color: '#66736F',
    fontSize: 15,
  },
  value: {
    color: '#16866A',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
