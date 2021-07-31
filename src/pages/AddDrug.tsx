import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import fundoBlur from '../images/fundo-blur.png';
import {AddDrugHeader} from '../components/AddDrugHeader';

const formatDate = (date: Date) => {

}


export default function AddDrug() {
  const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);
  const [time, setTime] = useState<string>();
  const [dose, setDose] = useState();
  const [images, setImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setIsDatePickerVisibility(false);
  }

  const handleConfirm = (date: Date) => {
    formatDate(date);

    const t = [date.getHours(), date.getMinutes()]

    const ti = t.join(':')
    console.log(ti)
    setTime(ti)

    hideDatePicker();
  }

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpa, precisamos da sua permissão para acessar a geleria!');
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.cancelled) {


      // setImage([...images, ])

    }
    console.log('Ação cancelada')
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
    >

      <StatusBar style={'auto'} />

      <Text>Nome do remédio</Text>
      <TextInput />

      <Text>Dosagem</Text>
      <Picker
        style={{
          color: 'blue',
          width: 200,
        }}
        mode='dropdown'
        selectedValue={dose}
        itemStyle={{
          color: 'red',
          backgroundColor: 'black'
        }}
        dropdownIconColor='red'
        numberOfLines={2}
        onValueChange={
          (itemValue) => {
            setDose(itemValue)
          }
        }
      >
        <Picker.Item label='Comprimido' value='Comprimido' style={{ backgroundColor: 'cyan', color: 'red' }} />
        <Picker.Item label='Gotas' value='Gotas' />
        <Picker.Item label='Gotas' value='Gotas' />
        <Picker.Item label='Gotas' value='Gotas' />
      </Picker>

      <Text>Quantidade</Text>
      <TextInput
        keyboardType='number-pad'

      />

      {/* <Text>Horário</Text> */}
      <Button title='teste' onPress={showDatePicker} />
      <Text>{time}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='time'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text>Opcionais</Text>

      <Text>Sobre</Text>
      <TextInput multiline={true} />

      <Text>Imagens</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
      >
        <Text>Add Image</Text>
        <Modal
          animationType='fade'
          transparent={true}
          statusBarTranslucent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          {/* <AddDrugHeader /> */}
          <ImageBackground 
            source={fundoBlur}
            resizeMode='cover'
            style={styles.centeredView}
            blurRadius={50}
          >
            <View style={styles.modalView}>

              
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text>Escolha da galeria</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text>Tirar uma foto</Text>
                </Pressable>
                
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text>Sair</Text>
                </Pressable>


            </View>
          </ImageBackground>
        </Modal>
      </TouchableOpacity>

    </ScrollView>
  );

}

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 85,

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