import Home from "./components/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewHome from "./components/NewHome";
import MyStack from "./navigation/StackNav";
import BookStack from "./navigation/BookStack";




const Tab = createBottomTabNavigator();

export default function App() {
	

	

	return (
	
        <NavigationContainer>
			<Tab.Navigator
		screenOptions={{
			tabBarStyle: {
			  backgroundColor: '#471598',
			  height: 60,
			 
			},
			tabBarInactiveTintColor:"#1F1047",
			tabBarActiveTintColor:"white"
		
			
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
				<Tab.Screen name="Settings" component={BookStack} options={{
					 tabBarShowLabel:false,
					headerShown:false,
					
					
				
					
					
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="bookshelf"
              color={color}
              size={size +10}
            />
          ),}}/>
			</Tab.Navigator>
		</NavigationContainer>
	    
		
	);
}
