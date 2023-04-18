import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StatusBar,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import client from "./QuestionItem";
import { FlatList } from "react-native";
import { COLORS, SIZES } from "./Constant";
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import { Pressable } from "react-native";

const numColumns = 2;

const DATA = [
	{ id: "1", title: "Item 1" },
	{ id: "2", title: "Item 2" },
	{ id: "3", title: "Item 3" },
	{ id: "4", title: "Item 4" },
	{ id: "5", title: "Item 5" },
];

const { width: screenWidth } = Dimensions.get("window");
const ITEM_SIZE = screenWidth * 0.8;
const ITEM_SPACING = (screenWidth - ITEM_SIZE) / 2;

const NewHome = ({ navigation }) => {
	const renderItem = ({ item }) => {
		const { id, title } = item;

		return (
			<View
				style={{
					width: ITEM_SIZE,
					marginHorizontal: 10,
					backgroundColor: "gray",
					borderRadius: 10,
					justifyContent: "center",
					alignItems: "center",
					elevation: 5,
				}}
			>
				<Text style={styles.title}>{title}</Text>
			</View>
		);
	};

	const [columnWidth, setColumnWidth] = useState(0);
	const [DataLoaded, setDataLoaded] = useState(true);

	const [Datas, setDatas] = useState([]);
	const [DatasFeatured, setDatasFeatured] = useState([]);
	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	useEffect(() => {
		setColumnWidth(SIZES.width / numColumns);
	}, []);

	useEffect(() => {
		client
			.fetch(
				`
	*[_type == 'category']{
		_id,
		title,
		categoriesHead[0]->{
			title,
			
			   },
	   "imageUrl": image.asset->url
	   
	  }
  `
			)
			.then((res) => {
				setDatas(res);
		

				setDataLoaded(false);
			});
	}, []);

	useEffect(() => {
		client
			.fetch(
				`
	*[_type == 'weeklyCurrentAffair']{
		_id,
		title,
	   "imageUrl": image.asset->url
	   
	  }
  `
			)
			.then((res) => {
				setDatasFeatured(res);
				
			});
	}, []);

	if (!FontLoaded) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}
	// spacing between items

	return (
		// <ImageBackground source={require('../assets/sd.jpg')} style={{ flex: 1 }}>
<View style={{
	flex:1
}}>

{DataLoaded?(  <View
        style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }}
        >

     
        <ActivityIndicator size="large" color="#471598" />
        </View>):(<View className="bg-[#FAF9F6] relative  ">
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					width: SIZES.width,
					justifyContent: "space-between",
					marginTop: 7,
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontFamily: "Nunito_800ExtraBold",
						paddingHorizontal: 10,
						fontSize: 17,
						color: "black",
					}}
				>
					Weekly Current Affairs{" "}
				</Text>

				<TouchableOpacity onPress={() => navigation.navigate("FeaturedFornt")}>
					<MaterialCommunityIcons
						name="chevron-small-right"
						style={{
							color: "black",
							fontSize: 35,
						}}
					/>
				</TouchableOpacity>
			</View>

			<FlatList
				data={DatasFeatured}
				renderItem={(h) => {
					return (
						<Pressable
							onPress={() =>
								navigation.navigate("FetauredQuizes", { data: h.item.title })
							}
						>
							<View
								style={{
									width: ITEM_SIZE,
									marginHorizontal: 10,
									borderRadius: 10,
									justifyContent: "center",
									alignItems: "center",
									elevation: 2,
									height: 170,
								}}
							>
								<Image
									source={{
										uri: `${h.item.imageUrl}`,
									}}
									style={{
										height: "100%",
										width: "100%",
										borderRadius: 10,
									}}
								/>
							</View>
						</Pressable>
					);
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>

			{/* <Text className="text-xl font-semibold mx-3 text-[#471598] mt-3">Quizes</Text> */}
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					width: SIZES.width,
					justifyContent: "space-between",
					marginTop: 7,
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontFamily: "Nunito_800ExtraBold",
						paddingHorizontal: 10,
						fontSize: 17,
						color: "black",
					}}
				>
					Quizes
				</Text>
				<TouchableOpacity>
					<MaterialCommunityIcons
						name="chevron-small-right"
						style={{
							color: "black",
							fontSize: 35,
						}}
					/>
				</TouchableOpacity>
			</View>

			<View>
				<FlatList
					data={Datas}
					numColumns={2}
					renderItem={(g) => {
						return (
							<View
								style={{
									width: columnWidth,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("FrontTitle", { data: g.item.title })
									}
								>
									<View
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											margin: 8,
											backgroundColor: "#471598",
											borderRadius: 8,
											paddingVertical: 10,
											width: SIZES.width / 2 - 20,
										}}
									>
										<View>
											<Image
												source={{
													uri: `${g.item.imageUrl}`,
												}}
												style={{
													height: 70,
													width: 70,
													borderRadius: 10,
												}}
											/>
										</View>
										<Text
											style={{
												fontFamily: "Nunito_800ExtraBold",
												fontSize: 15,
												color: "white",
												marginTop: 3,
											}}
										>
											{g.item.title}
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						);
					}}
				/>
			</View>
		</View>)}
		
		</View>
		// </ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: ITEM_SPACING,
	},
	itemContainer: {
		width: ITEM_SIZE,
		height: ITEM_SIZE,
		borderRadius: 8,
		marginHorizontal: ITEM_SPACING,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ccc",
	},
	activeItem: {
		backgroundColor: "#007AFF",
	},
	title: {
		color: "#fff",
		fontSize: 32,
		fontWeight: "bold",
	},
});

export default NewHome;
