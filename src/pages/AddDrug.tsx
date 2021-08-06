import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Animated, Image, ImageBackground, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import fundoBlur from '../images/fundo-blur.png';
import { AddDrugHeader } from '../components/AddDrugHeader';
import { useEffect } from 'react';
import { DisplayImage } from '../components/DisplayImage';

const labelDoses = [
  'Comprimido(s)',
  'Gramas (gm)',
  'Miligramas (mg)',
  'Mililitros (ml)',
  'Gotas',
  'Spray',
];

const addZero = (time: number) => {

  if (time < 10) {
    let result = '0' + time;
    return result;
  }

  return time;

}

const formatDate = (date: Date) => {
  const time = [
    addZero(date.getHours()),
    addZero(date.getMinutes())
  ]

  const formatTime = time.join(':')

  return formatTime;
}

export default function AddDrug() {
  const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);
  const [time, setTime] = useState<string>();
  const [dose, setDose] = useState();
  const [images, setImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [displayImage, setDisplayImage] = useState(false);

  useEffect(() => {
    let date = new Date();

    const result = formatDate(date);

    setTime(result);
  }, []);

  const showDatePicker = () => {
    setIsDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setIsDatePickerVisibility(false);
  }

  const handleConfirm = (date: Date) => {
    const result = formatDate(date);

    setTime(result);

    hideDatePicker();
  }

  const checkNumberOfImages = () => {
    return images.length;
  }

  const handleImagePickerLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpa, precisamos da sua permissão para acessar a geleria!');
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {

      setImages([...images, result.uri])

    }

  }

  const handleImagePickerCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpa, precisamos da sua permissão para acessar a geleria!');
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {

      setImages([...images, result.uri])

    }

  }

  return (
    <ScrollView
      style={styles.scrollView}
      keyboardShouldPersistTaps='handled'
      enabled={false}
    >
      <KeyboardAvoidingView
        behavior='padding'
      >
        <StatusBar style={'auto'} />

        {/* Nome do remédio */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.styleText}>Nome do remédio</Text>
          <TextInput style={styles.styleTextInput} />
        </View>

        {/* Dosagem e Quantidade */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15
        }}>

          {/* Dosagem */}
          <View>
            <Text style={styles.styleText}>Dosagem</Text>
            <Picker
              style={{
                color: 'black',
                width: 180,
              }}
              mode='dropdown'
              selectedValue={dose}
              onValueChange={
                (itemValue) => {
                  setDose(itemValue)
                }
              }
            >
              {
                labelDoses.map(label => {
                  return <Picker.Item label={label} value={label} key={label} />
                })
              }
            </Picker>
          </View>

          {/* Quantidade */}
          <View style={{
            alignItems: 'center'
          }}>
            <Text style={styles.styleText}>Quantidade</Text>
            <TextInput
              keyboardType='number-pad'
              style={[styles.styleTextInput, {
                width: 50,
                textAlign: 'center'
              }]}
            />
          </View>
        </View>

        {/* Horário */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.styleText}>Horário</Text>
          <Pressable
            onPress={showDatePicker}
            style={{
              borderColor: '#8fa7b3',
              borderBottomWidth: 2,
              width: 50,
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <Text>{time}</Text>
          </Pressable>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='time'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        {/* Opcionais */}

        {/* Sobre */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.styleText}>
            Sobre - <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Opcional</Text>
          </Text>
          <TextInput
            multiline={true}
            style={styles.styleTextInput}
          />
        </View>

        {/* Observação */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.styleText}>
            Observação - <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Opcional</Text>
          </Text>
          <TextInput
            multiline={true}
            style={styles.styleTextInput}
          />
        </View>

        {/* Imagens */}
        <Text style={styles.styleText}>
          Imagens - <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Opcional</Text>
        </Text>

        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}
        >
          {
            checkNumberOfImages() < 5
              ? (
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={() => setModalVisible(true)}
                >

                  <View >
                    <Feather name="plus" size={20} color="#26B9FE" />
                  </View>

                  <Modal
                    animationType='fade'
                    transparent={true}
                    statusBarTranslucent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible)
                    }}
                  >

                    <AddDrugHeader onGoBack={() => setModalVisible(!modalVisible)} />

                    <ImageBackground
                      source={fundoBlur}
                      resizeMode='cover'
                      style={styles.centeredView}
                      blurRadius={50}
                    >
                      <View style={styles.modalView}>

                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.photoOptions}
                          onPress={() => {
                            handleImagePickerLibrary();
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 17 }}>Escolha da galeria</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.photoOptions}
                          onPress={() => {
                            handleImagePickerCamera();
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 17 }}>Tire uma foto</Text>
                        </TouchableOpacity>

                      </View>
                    </ImageBackground>
                  </Modal>
                </TouchableOpacity>
              )
              : <Text></Text>
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

                  <Text style={{ color: 'black', fontFamily: 'Nunito_600SemiBold', fontSize: 17 }}>Deseja apagar a foto?</Text>

                  <TouchableOpacity
                    style={[styles.deleteImage, { backgroundColor: '#26B9FE' }]}
                    onPress={() => {

                      setImages(images.filter(image => image != selectedImage))

                      setImageModal(!imageModal)
                    }}
                  >
                    <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 15 }}>Sim</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.deleteImage, { backgroundColor: 'red' }]}
                    onPress={() => setImageModal(!imageModal)}
                  >
                    <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 15 }}>Não</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </ImageBackground>
          </Modal>

          {
            images.map(image => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={image}
                  onPress={() => {
                    
                    setSelectedImage(image);
                    setDisplayImage(!displayImage);

                  }}
                  onLongPress={() => {

                    setSelectedImage(image);
                    setImageModal(!imageModal);

                  }}
                >
                  <Image
                    style={styles.imageStyle}
                    source={{
                      uri: image
                    }}
                  />
                </TouchableOpacity>
              );
            })
          }

        </View>

        <DisplayImage showModal={displayImage} uri={selectedImage} response={() => setDisplayImage(!displayImage)}/>

        <TouchableOpacity
          onPress={() => console.log(images)}
          style={{
            backgroundColor: '#26B9FE',
            width: 250,
            alignItems: 'center',
            marginVertical: 80,
            marginHorizontal: 30,
            padding: 5,
            borderRadius: 10,
            elevation: 5
          }}
        >
          <Text style={{ color: '#FAFAFA', fontFamily: 'Nunito_600SemiBold', fontSize: 17 }}>Salvar</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </ScrollView>
  );

}

const styles = StyleSheet.create({

  scrollView: {
    padding: 30,
  },

  styleText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 17
  },

  imageStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },

  styleTextInput: {
    borderColor: '#8fa7b3',
    borderBottomWidth: 2,
    paddingLeft: 5,
  },

  addImage: {
    backgroundColor: '#FAFAFA',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#26B9FE',
    marginRight: 10
  },

  photoOptions: {
    backgroundColor: '#26B9FE',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5
  },

  deleteImage: {
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