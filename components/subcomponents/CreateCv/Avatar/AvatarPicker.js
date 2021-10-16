import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  Dimensions, SafeAreaView,
  StatusBar, StyleSheet,
  Text,
  TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import ActionSheet from './ActionSheet';

const AvatarPicker = (props) => {

  const { setAvatar } = props;
  const actionItems = [
    {
      id: 1,
      label: 'Take Photo',
      onPress: () => openCamera()
    },
    {
      id: 2,
      label: 'Choose Photo Libray',
      onPress: () => openLibraryImage()
    }
  ];
  
  const [actionSheet, setActionSheet] = useState(false);
  const closeActionSheet = () => setActionSheet(false);

  const openCamera = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: false
      },

    }
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancel image picker')
      }
      else if (response.error) {
        console.log('Image error ', response.error)
      }
      else if (response.customButton) {
        console.log('You tapped custom button ', response.customButton)
      }
      else {
        const { assets } = response;
        setAvatar(assets);
       // setActionSheet(false);
      }
      setActionSheet(false);
    })
  }

  const openLibraryImage = () => {
    let options = {
      storageOptions: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
      },

    }
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancel image picker')
      }
      else if (response.error) {
        console.log('Image error ', response.error)
      }
      else if (response.customButton) {
        console.log('You tapped custom button ', response.customButton)
      }
      else {
        //  const source = { uri: 'data:image/jpeg;base64,' + response.data }

        const { assets } = response;
        setAvatar(assets);
       
      }
      setActionSheet(false);
    })
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setActionSheet(true)}>
          <View style={styles.buttonStyle}><Text style={styles.buttonText}>Get Avatar</Text></View>
        </TouchableOpacity>
        <Modal
          isVisible={actionSheet}
          style={{
            margin: 0,
            justifyContent: 'flex-end'
          }}
        >
          <ActionSheet
            actionItems={actionItems}
            onCancel={closeActionSheet}
          />
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop:-10
  },
  buttonStyle: {
    height: 45,
    backgroundColor: 'rgb(0,98,255)',
    width: Dimensions.get('window').width - 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
   // margin: 5
  },
  buttonText: {
    fontSize: 20,
    color: 'rgb(255,255,255)',
    fontFamily:'Gluten-ExtraLight',
  }
});

export default AvatarPicker;