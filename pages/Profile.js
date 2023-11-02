import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  AsyncStorage,
} from 'react-native';
import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Profile = () => {
  const [img, setImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = async () => {
    //Alert.alert('asdasd');
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled the camera');
      } else if (response.errorCode) {
        console.error('Camera Error:', response.errorMessage);
      } else {
        const imageUri = response.assets[0].uri;
        setImg(imageUri);
        const imagePath = `${RNFS.DocumentDirectoryPath}/your-image-name.jpg`;

        try {
          // Use `await` with `RNFS.moveFile` and `AsyncStorage.setItem`

          await RNFS.moveFile(imageUri, imagePath);
          await AsyncStorage.setItem('image', imagePath);
          const imagePath = await AsyncStorage.getItem('image');
          console.log('image ====>>>', imagePath);
          console.log(
            'Image saved to internal storage and path saved to AsyncStorage',
          );
        } catch (error) {
          console.error(
            'Error saving image to internal storage or AsyncStorage:',
            error,
          );
        }
      }
    });
  };

  const picFromGallery = () => {
    const options = {
      mediaType: 'photo',
      saveImage: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled selecting from gallery');
      } else if (response.errorCode) {
        console.error('Gallery Error:', response.errorMessage);
      } else {
        // Set the image URI in the state
        setImg(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <View style={{height: 300}}>
          <TouchableOpacity
            onPress={picFromGallery}
            style={{
              height: 40,
              top: 80,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 120,
              }}
              source={{
                uri: img,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', height: 100}}>
          <TouchableOpacity
            style={{
              fontSize: 19,
              height: 50,
              width: 300,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              shadowColor: 'blue',
              shadowOffset: {width: 5, height: 10},
              shadowRadius: 2,
              shadowOpacity: 1,
              elevation: 8,
            }}
            // onPress={openCamera}
            onPress={requestCameraPermission}>
            <Text style={{fontSize: 19, color: 'white'}}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
