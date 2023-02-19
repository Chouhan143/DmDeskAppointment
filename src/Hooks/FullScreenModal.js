import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const FullScreenModal = ({ visible, onClose, uri }) => {
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
    <View style={styles.modal}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Entypo name="circle-with-cross" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.content}>
          <Image source={{uri: uri}} style={styles.image} />
          <Text>Modal content goes here</Text>
        </View>
    </View>
  </Modal>
  );
};


const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'black'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(100) - 30,
    height: responsiveHeight(100) - 30,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
export default FullScreenModal;
