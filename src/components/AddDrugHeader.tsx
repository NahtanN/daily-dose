import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ImageBackground } from "react-native";
import { FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import fundoBlur from '../images/fundo-blur.png';

interface IHeader {
  onGoBack?: (res: boolean) => void;
}

const AddDrugHeader = ({ onGoBack }: IHeader) => {
  const [imageModal, setImageModal] = useState(false);

  const navigation = useNavigation();
  
  const handleCloseButton = () => {
    
  }

  const handleArrowLeftButton = () => {
    
    onGoBack
      ? onGoBack(true)
      : navigation.goBack()
    
  }

  return (
    <View
      style={styles.header}
    >
      <TouchableOpacity
        onPress={handleArrowLeftButton}
      >
        <Feather name="arrow-left" size={25} color="#15b6d6" />
      </TouchableOpacity>
      
      <Text
        style={styles.title}
      >
        Adicionar Remédio
      </Text>

      {
        !onGoBack
          ? (
            <TouchableOpacity
              onPress={() => setImageModal(!imageModal)}
            >
              <Feather name="x" size={24} color="#ff669d" />
            </TouchableOpacity>
          )
          : <Text style={{marginLeft: 25}}></Text>
      }

          <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={imageModal}
            onRequestClose={() => {
              setImageModal(!imageModal)
            }}
          >
            <ImageBackground
              source={fundoBlur}
              resizeMode='cover'
              style={styles.centeredView}
              blurRadius={50}
            >
              <View style={styles.centeredView}>

                <View style={styles.modalView}>

                  <Text style={{ color: 'black', fontFamily: 'Nunito_600SemiBold', fontSize: 17 }}>Deseja apagar o rascunho?</Text>

                  <TouchableOpacity
                    style={[styles.closeOptions, { backgroundColor: '#26B9FE' }]}
                    onPress={() => setImageModal(!imageModal)}
                  >
                    <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 15 }}>Sim</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.closeOptions, { backgroundColor: 'red' }]}
                    onPress={() => setImageModal(!imageModal)}
                  >
                    <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 15 }}>Não</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </ImageBackground>
          </Modal>      
      
    </View>
  );

}

const styles = StyleSheet.create({

  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'white',
  },

  title: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 17
  },

  closeOptions: {
    width: 100,
    height: 20,
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  }

});

export { AddDrugHeader };