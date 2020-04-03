import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfilScreen from '../screens/ProfilScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const [data, setData] = React.useState([]);
  React.useEffect(()=>{
    async function fetchData(){
      const dvalue = await AsyncStorage.getItem("data"); 
      if(dvalue){ await setData(JSON.parse(dvalue)); }
    }
    
    fetchData();
  }, [])

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={(props)=>{
          return(<HomeScreen  data={data} setData={setData} {...props} />)
        }}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={(props)=>{
          return(<AddScreen  data={data} setData={setData} {...props} />)
        }}
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Todo List';
    case 'Add':
      return 'Add Todo';
    case 'Profil':
      return 'Your profil';
  }
}
