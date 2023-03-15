import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 30,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

//To access photos in a mobile device using code,
// you will need to use the device's native APIs for
// accessing photos. For example, on iOS devices, you can use 
//the Photos framework, which provides classes for accessing 
//and managing photos and videos. On Android devices, you can use 
//the MediaStore class to query for and retrieve photos.

//This example uses the expo-image-picker library to access the 
//device's media library and retrieve a photo. The pickImage function
// is called when the user presses the button, which launches the media 
//library and allows the user to select an image. Once the user has
// selected an image, the selectedImage state is updated with the URI 
//of the selected image, and the image is displayed on the screen using
// the Image component.
