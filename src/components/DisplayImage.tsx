import React, { useRef } from 'react';
import { Modal, Text, View, StyleSheet, Image, Dimensions, Animated, Pressable, TouchableOpacity, PanResponderGestureState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';


interface IDisplayImage {
  showModal: boolean;
  uri: string;
  response: (res: boolean) => void;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DisplayImage = ({ showModal, uri, response }: IDisplayImage) => {
  const [showHeader, setShowHeader] = useState(true);

  const moveHeaderModal = useRef(new Animated.Value(-windowHeight)).current;

  const openHeaderModal = () => {

    Animated.timing(moveHeaderModal, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start();

  }

  const closeHeaderModal = () => {

    Animated.timing(moveHeaderModal, {
      toValue: -windowHeight,
      duration: 500,
      useNativeDriver: true
    }).start();

  }

  const onSwipe = (gesture: string, state: PanResponderGestureState) => {
    switch (gesture) {
      case 'SWIPE_UP':
        closeHeaderModal()
    }
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  showHeader
    ? openHeaderModal()
    : closeHeaderModal()

  return (
    <Modal
      animationType='fade'
      statusBarTranslucent={true}
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        response(false);
      }}
    >

      <View
        style={{
          flex: 1,
          backgroundColor: 'black'
        }}
      >

        <Animated.View
          style={[styles.animatedView, {
            transform: [
              {
                translateY: moveHeaderModal
              }
            ],
          }]}
        >

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.moveArrowLeft}
            onPress={() => response(false)}
          >
            <Feather name="arrow-left" size={25} color="white" />
          </TouchableOpacity>

          <View style={styles.moveTrash}>
            <Feather name="trash-2" size={24} color="red" />
          </View>

        </Animated.View>

        <GestureRecognizer 
          style={styles.modalView}
          // onTouchEnd={() => setShowHeader(!showHeader)}
          onSwipe={(direction, state) => onSwipe(direction, state)}
          config={config}
        >
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{
              uri
            }}
          />
        </GestureRecognizer>

      </View>

    </Modal>
  );

}

const styles = StyleSheet.create({

  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    zIndex: 0
  },

  animatedView: {
    position: 'absolute',
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 40,
    paddingHorizontal: 20,
    zIndex: 1
  },

  image: {
    width: windowWidth,
    height: '70%'
  },

  moveArrowLeft: {

    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',

    // backgroundColor: 'blue',
    // width: 50,
    // height: 50
    // paddingTop: 40,
    // backgroundColor: '#26B9FE',
    //         width: 50,
    //         height: 50,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         borderRadius: 20,
    //         elevation: 2

  },

  moveTrash: {

    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',

    // position: 'absolute',
    // right: 20,
    // top: 40,
  }

});

export { DisplayImage }