import React from "react";
import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderStyleInterpolators,
} from "@react-navigation/stack";
import NewHome from "../components/NewHome";
import Home from "../components/Home";
import FrontTitle from "../components/FrontTitle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ActivityIndicator, Easing, Linking, StatusBar, StyleSheet, Text, View } from "react-native";
// import { Easing } from 'react-native';
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import FeaturedFornt from "../components/FeaturedFornt";
import FetauredQuizes from "../components/FetauredQuizes";
import SubCat from "../components/SubCat";
import ResultScreen from "../components/ResultScreen";
import { COLORS } from "../components/Constant";

const Stack = createStackNavigator();

const config = {
	animation: "friction",
	config: {
		stiffness: 800,
		damping: 50,
		mass: 3,
		overshootClamping: false,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};

const closeConfig = {
	animation: "friction",
	config: {
		duration: 200,
		easing: Easing.linear,
	},
};

function MyStack() {
	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	if (!FontLoaded) {
		return (
			<View style={{
				flex:1,
				justifyContent:"center",
				alignContent:"center"
			}}>
				<ActivityIndicator size="large" color="#471598" />
			</View>
		);
	}

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					elevation: 4,
					shadowOpacity: 0.8,
				},
				transitionSpec: {
					open: config,
					close: closeConfig,
				},
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // this adds the shadow to the header
			}}
		>
			<Stack.Screen
				options={{
					title: "SSC Lucent Genius",
					headerStyle: {
						backgroundColor: "#471598",
						elevation: 5,
						shadowOpacity: 0.5,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerTitleAlign: "center",
					headerLeft: () => (
						<MaterialCommunityIcons
							name="menu"
							size={30}
							color="#471598"
							style={{ marginLeft: 10, padding: 2, color: "white" }}
							onPress={() => {
								// handle left menu icon press
							}}
						/>
					),
					headerRight: () => (
						<MaterialCommunityIcons
							name="youtube"
							size={33}
							color="#fff"
							onPress={() => {
								
									Linking.openURL("https://www.youtube.com/@SSCLucentGenius");
								 
							}}
						/>
					),
				}}
				name="HomeStack"
				component={NewHome}
			/>

			<Stack.Screen

      options={({ route }) => ({ title: route.params.data,
	headerStyle: {
		backgroundColor: COLORS.primary,
		elevation: 5,
		shadowOpacity: 0.5,
	},
	headerTintColor: "#fff",
	headerTitleStyle: { 
		fontWeight:"bold"

	}

   
})}


				// options={{
				// 	title: "SSC Lucent Genius",
				// 	headerStyle: {
				// 		backgroundColor: "#471598",
				// 		elevation: 5,
				// 		shadowOpacity: 0.5,
				// 	},
				// 	headerTintColor: "#fff",
				// 	headerTitleStyle: {
				// 		fontWeight: "bold",
				// 	},
				// 	headerTitleAlign: "center",
				// }}
				name="Front"
				component={Home}
			/>
			<Stack.Screen
				name="FrontTitle"
				options={{
					title: "SSC Lucent Genius",
					headerStyle: {
						backgroundColor: "#471598",
						elevation: 5,
						shadowOpacity: 0.5,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerTitleAlign: "center",
				}}
				component={FrontTitle}
			/>
		
			<Stack.Screen
				name="FeaturedFornt"
				options={{
					title: "SSC Lucent Genius",
					headerStyle: {
						backgroundColor: "#471598",
						elevation: 5,
						shadowOpacity: 0.5,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerTitleAlign: "center",
				}}
				component={FeaturedFornt}
			/>
			<Stack.Screen
				name="FetauredQuizes"
				options={{
					title: "SSC Lucent Genius",
					headerStyle: {
						backgroundColor: "#471598",
						elevation: 5,
						shadowOpacity: 0.5,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerTitleAlign: "center",
				}}
				component={FetauredQuizes}
			/>
			<Stack.Screen
				name="SubCat"
				options={{
					title: "SSC Lucent Genius",
					headerStyle: {
						backgroundColor: "#471598",
						elevation: 5,
						shadowOpacity: 0.5,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerTitleAlign: "center",
				}}
				component={SubCat}
			/>
			<Stack.Screen
				name="ResultScreen"
				options={{
					title: "Test Analysis",
					headerStyle: {
						backgroundColor: "#471598",
						elevation: 5,
						shadowOpacity: 0.5,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					// headerTitleAlign: "center",
				}}
				component={ResultScreen}
			/>
		</Stack.Navigator>
	);
}
export default MyStack;
