import * as React from 'react';
import { Share, Dimensions, AsyncStorage, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Card, Icon } from 'react-native-elements'
import { MonoText } from '../components/StyledText';

const {height, width} = Dimensions.get('window'); //screen
const FIXED_WIDTH = width - 40;

function customDate(item_date){
  if(item_date === undefined){ return }

  let date = new Date(item_date);
  let arrayMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'];
  let day = date.getDate()< 10 ? `0${date.getDate()}` : date.getDate();
  let month = arrayMonth[date.getMonth()];

  return `${month}, ${day}-${date.getFullYear()}`
}

function Item( {functionList, item, index} ){
  
  return(
    <View key={index}  style={{ alignItems: 'center', flex: 1, margin: 5, width: FIXED_WIDTH}} >
        <View style={{width: FIXED_WIDTH}}> 
          <Card>
            <TouchableOpacity onPress={ e => functionList.onCheckedItem(e, index) }>
              <View>
                <Text style={item.checked ? styles.todoCheked: styles.todoUncheked}>
                  <Icon
                    name={item.checked ? 'check' : 'close'}
                    size={15}
                    color={item.checked ? 'red' : 'gray'}
                  />
                  {item.title}
                </Text> 
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{color: '#cfd3e1', fontSize: 10, flex:50, alignContent: 'flex-start', textAlign: 'left'}}>
                    {customDate(item.date)}
                  </Text>
                  <Text style={{color: '#9eaeb5', fontSize: 10, flex:50, alignContent: 'flex-end', textAlign: 'right'}}>
                    Due: ...
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={ e => functionList.onTrashItem(e, index) }>
                <Icon
                  name="delete"
                  size={15}
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={ e => functionList.onShareItem(e, index)}>
                <Icon
                  name="share"
                  size={15}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
    </View>
  )
}

export default function HomeScreen(props) {
  
  const onCheckedItem = async (e, index)=> {
    e.preventDefault();

    let d = [...props.data];
    d[index].checked = !d[index].checked;
    await props.setData(d);
    await AsyncStorage.setItem("data", JSON.stringify(d));
  }

  const onTrashItem= async (e, index)=> {
    e.preventDefault();
    let d = [...props.data];
    await d.splice(index, 1)
    await props.setData(d);
    await AsyncStorage.setItem("data", JSON.stringify(d));
  }

  const onShareItem = (e, index)=> {
    e.preventDefault();
    let d = [...props.data][index];
    
    Share.share({
      message: `${d.title}`,
      url: '',
      title: `${d.title}`,
    })
      .then((result)=>{
      //result.action === Share.sharedAction
        // -> result.activityType
      //result.action === Share.dismissedAction
      })
      .catch(error=> console.log('**error**'))
  }

  const handleNavigateAdd = ()=> {
    props.navigation.navigate('Add');
  }

  const [refresh, setRefresh]= React.useState(false);
  const objFuncEvent = {onCheckedItem, onTrashItem, onShareItem}

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              require('../assets/images/to-do-list.svg')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          {
            props.data.length ?
            <></>
            :
            <TouchableOpacity onPress={handleNavigateAdd}>
              <Text style={{fontSize: 14, color: '#d5e4f0', textAlign: 'center', }}> Blank list, click to <span style={{color: 'green'}}>Add </span> a new item</Text>
            </TouchableOpacity>
            
          }
          {/* numColumns={2} */}
          <FlatList
            data={props.data}
            refreshing={refresh}
            onRefresh={ ()=> { setRefresh(true); console.log('ok with')} }
            extraData={props.data}
            renderItem={ ({ item, index }) => <Item functionList={objFuncEvent} item={item} index={index} />}
            keyExtractor={ item => item.id.toString()}
          />
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>See this project on Github!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://github.com/ingdjason/SimpleTodoReactNative/'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  todoCheked: {
    marginBottom: 10, 
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    cursor: 'pointer',
    color: 'red'
  },
  todoUncheked: {
    marginBottom: 10, 
    color: 'black'
  }
}); 

{/* 
  style={{flex:1, flexDirection:'column', justifyContent:'center'}} 
    style={{flexDirection:'row'}}
      ->style={{flex:0.8, borderWidth:1, height:20}} (flex: 60)
      -> style={{flex:0.2}} (flex: 40)
*/}