import { createStackNavigator } from '@react-navigation/stack';
import NewHome from '../components/NewHome';
import Home from '../components/Home';
import FrontTitle from '../components/FrontTitle';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={NewHome} />
    
      <Stack.Screen name="Front" component={Home} />
      <Stack.Screen name="FrontTitle" component={FrontTitle} />
    </Stack.Navigator>
  );
}
export default MyStack