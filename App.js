import Home from "./components/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Setting from "./components/Setting";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewHome from "./components/NewHome";
import MyStack from "./navigation/StackNav";
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
		screenOptions={{
			tabBarStyle: {
			  backgroundColor: '#1F1047',
			  height: 60,
			 
			},
			
		  }}
			
			>
				<Tab.Screen name="Home" component={MyStack} options={{
					headerShown:false,
					tabBarShowLabel:false,
						tabBarLabel: 'Home',
						tabBarIcon: ({color, size}) => (
						  <MaterialCommunityIcons
							name="home"
							color={color}
							size={size+10}
						  />
						),
					  }}/>
				<Tab.Screen name="Settings" component={Setting} options={{
					 tabBarShowLabel:false,
					headerShown:false,
					tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={size +10}
            />
          ),}}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
