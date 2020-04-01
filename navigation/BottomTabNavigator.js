import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfilScreen from '../screens/ProfilScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const [data, setData] = React.useState([
    {
      id: '1',
      title: 'The idea with React Native Elements is more about component structure than actual design.',
      checked: true,
    },
    {
      id: '2',
      title: 'React Native Elements is more about component structure than actual design',
      checked: false,
    },
    {
      id: '3',
      title: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      checked: false,
    },
  ]);

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
      <BottomTab.Screen
        name="Profil"
        component={(props)=>{
          return(<ProfilScreen  {...props} />)
        }}
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
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
