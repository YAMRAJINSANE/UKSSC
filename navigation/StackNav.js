import { createStackNavigator } from '@react-navigation/stack';
import NewHome from '../components/NewHome';
import Home from '../components/Home';
import FrontTitle from '../components/FrontTitle';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={NewHome} options={{headerShown:false}} />
    
      <Stack.Screen name="Front" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="FrontTitle" component={FrontTitle} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}
export default MyStack