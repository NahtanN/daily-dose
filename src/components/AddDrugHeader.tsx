import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface IHeader {
  onGoBack?: (res: boolean) => void;
}

const AddDrugHeader = ({ onGoBack }: IHeader) => {
  const navigation = useNavigation();
  
  const handleCloseButton = () => {
    alert('Deseja apagar o rascunho?');
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
              onPress={handleCloseButton}
            >
              <Feather name="x" size={24} color="#ff669d" />
            </TouchableOpacity>
          )
          : <Text style={{marginLeft: 25}}></Text>
      }
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
  }

});

export { AddDrugHeader };