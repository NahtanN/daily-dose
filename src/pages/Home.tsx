import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const drugSchema = (key: string, defFirstMargin: number = 0, defLastMargin: number = 0) => {
  const navigation = useNavigation();

  let top;
  let bottom;

  if (key == list[0].toString()) top = defFirstMargin;
  else top = 15;

  key == list[list.length - 1].toString()
    ? bottom = defLastMargin
    : bottom = 0

  return (
    <Pressable
      key={key}
      onPress={() => alert('Remedio')}
      style={{
        backgroundColor: '#EFEFEF',
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 5,
        marginTop: top,
        marginBottom: bottom
      }}
    >
      <View style={{
        width: 200
      }}>
        <Text style={{
          fontFamily: 'Nunito_600SemiBold',
          fontSize: 19,
          paddingBottom: 5
        }}
        >
          Remédio Dipirona
        </Text>
        <Text style={{
          fontFamily: 'Nunito_400Regular'
        }}
        >
          1 Comprimido
        </Text>
      </View>

      <View style={{
        // backgroundColor: 'red',
        justifyContent: 'center',
        paddingHorizontal: 20
      }}>
        <Text style={{
          // backgroundColor: 'white',
          fontFamily: 'Nunito_400Regular'
        }}>10:00</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <StatusBar style={'auto'} />

      {/* Header view */}
      <View style={styles.header}>
        <View
          style={styles.buttonView}
        >
          <TouchableOpacity
            onPress={() => alert('teste')}
            style={styles.button}
          >
            <FontAwesome5 name="ellipsis-v" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.headerText,
            { fontSize: 30 }
          ]}
        >
          Bom dia Bruno!
        </Text>

        <Text
          style={[
            styles.headerText,
            { fontSize: 19 }
          ]}
        >
          Essa é a sua lista de remédios do dia
        </Text>
      </View>

      {/* List drugs view */}
      <ScrollView>
        {
          list.map(item => {
            return drugSchema(item.toString(), 20, 80);
          })
        }
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          right: 20,
          bottom: 15
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDrug')}
          style={{
            backgroundColor: '#26B9FE',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            elevation: 2
          }}
        >
          <FontAwesome5 name='plus' size={20} color='#FAFAFA' />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'column'
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,

    backgroundColor: '#27C658',

    justifyContent: 'center',
    elevation: 10
  },
  buttonView: {
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    alignItems: 'flex-end',
    // backgroundColor: '#Fbd',
    width: 30,
    height: 20,
  },
  image: {
    width: 60,
    height: 20
  },
  headerText: {
    fontFamily: 'Nunito_600SemiBold',
    // fontSize: 30,
    color: '#FAFAFA',
    // padding: 3
  },
  drug: {

  }
});
