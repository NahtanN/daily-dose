import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const AddDrugHeader = () => {
  const navigation = useNavigation();
  
  const handleCloseButton = () => {
    alert('Deseja apagar o rascunho?');
  }

  return (
    <View
      style={styles.header}
    >
      <BorderlessButton
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={25} color="#15b6d6" />
      </BorderlessButton>
      
      <Text
        style={styles.title}
      >
        Adicionar Remédio</Text>

      <BorderlessButton
        onPress={handleCloseButton}
      >
        <Feather name="x" size={24} color="#ff669d" />
      </BorderlessButton>
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