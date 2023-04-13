import Home from "./components/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Setting from "./components/Setting";
import NewHome from "./components/NewHome";
import MyStack from "./navigation/StackNav";
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={MyStack} options={{headerShown:false}}/>
				<Tab.Screen name="Settings" component={Setting} options={{headerShown:false}}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
