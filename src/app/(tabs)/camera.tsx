import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useActivities } from '../../context/ActivityContext';

export default function CameraScreen() {
  const { activities, updateActivityPhoto } = useActivities();
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedId, setSelectedId] = useState(activities[0]?.id ?? '');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  async function takePhoto() {
    if (!cameraRef.current || !selectedId) {
      Alert.alert('Select an activity', 'Choose an activity first.');
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo?.uri) {
        setPhotoUri(photo.uri);
        updateActivityPhoto(selectedId, photo.uri);
        setCameraVisible(false);
        Alert.alert('Success', 'Photo attached to your activity!');
      }
    } catch {
      Alert.alert('Camera error', 'Could not take the photo. Please try again.');
    }
  }

  if (!permission) {
    return <View style={styles.container}><Text>Loading camera permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Activity Camera 📷</Text>
        <Text style={styles.subtitle}>Allow camera access to attach photos to activities.</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera Access</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Activity Camera 📷</Text>
      <Text style={styles.subtitle}>Choose an activity for your photo.</Text>

      {activities.map((activity) => (
        <Pressable
          key={activity.id}
          style={[
            styles.activity,
            selectedId === activity.id && styles.selectedActivity,
          ]}
          onPress={() => setSelectedId(activity.id)}
        >
          <Text style={styles.activityTitle}>{activity.type}</Text>
          <Text>{activity.date}</Text>
          {activity.photoUri ? <Text>📷 Photo attached</Text> : null}
        </Pressable>
      ))}

      {cameraVisible ? (
        <View style={styles.cameraFrame}>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />
          <Pressable style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </Pressable>
          <Pressable
            style={styles.cancelButton}
            onPress={() => setCameraVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => {
            if (!selectedId) {
              Alert.alert('Select an activity', 'Choose an activity first.');
              return;
            }
            setCameraVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </Pressable>
      )}

      {photoUri ? (
        <View style={styles.preview}>
          <Text style={styles.activityTitle}>Latest photo</Text>
          <Image source={{ uri: photoUri }} style={styles.photo} />
        </View>
      ) : null}
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
    marginTop: 6,
    marginBottom: 18,
    color: '#66736F',
  },
  activity: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  selectedActivity: {
    borderColor: '#16866A',
    borderWidth: 2,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#163A35',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#16866A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: '#66736F',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraFrame: {
    marginTop: 12,
  },
  camera: {
    height: 350,
    borderRadius: 12,
    overflow: 'hidden',
  },
  preview: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
  },
  photo: {
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
});
