import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, PanResponderGestureState, StyleSheet, TouchableOpacity, View, ScrollView, Pressable, NativeScrollEvent } from 'react-native';

interface IDisplayImage {
  showModal: boolean;
  uri: string;
  imagesArray: string[];
  response: (res: boolean) => void;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DisplayImage = ({ showModal, uri, imagesArray, response }: IDisplayImage) => {
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

  const handleScroll = (e: NativeScrollEvent) => {
    // console.log(e.contentOffset.y)
  }

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

        <ScrollView
          contentOffset={{
            x: 360,
            y: 0
          }}
          horizontal
          pagingEnabled
          removeClippedSubviews={true}
          
          onScroll={(e) => {
            console.log(e.nativeEvent.contentOffset)
          }}
        >

          {

            imagesArray.map(imageUri => {
              return (
                <Pressable
                  style={styles.modalView}
                  onPress={() => setShowHeader(!showHeader)}
                  key={imageUri}
                >
                  <Image
                    resizeMode={'contain'}
                    style={styles.image}
                    source={{
                      uri: imageUri
                    }}
                  />
                </Pressable>

              );
            })

          }

        </ScrollView>

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

export { DisplayImage };
