import * as React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Input, Icon, Button, Divider, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default function AddScreen(props) {
 
  const [values, setValues] = React.useState({title: ''})
  

  const submitData = (e)=> {
    e.preventDefault();
    let d = [...props.data];
    d.push({id: d.length+1, checked: false, ...values})
    props.setData(d);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.containerForm}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Todo title here..."
            placeholderTextColor="#003f5c"
            onChangeText={text=> setValues({title: text})}
          />
        </View>
        <Divider style={{ backgroundColor: 'blue' }} />
        <TouchableOpacity style={styles.loginBtn} onPress={submitData}>
          <Icon
            name="save"
            size={15}
            color="#000"
          />
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>
        
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:25,
    height:50,
    marginBottom:6,
    justifyContent:"center",
    padding:10
  },
  inputText:{
    height:50,
    color:"#000"
  },
  containerForm: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
    backgroundColor: '#d5e9f8',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    marginStart: 10,
    marginEnd: 10
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#2f95dc",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});


{/* secureTextEntry={true} */}
                