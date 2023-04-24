import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StatusBar,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
	Button,
} from "react-native";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
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


const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
	requestNonPersonalizedAdsOnly: true
  });


  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const { width: screenWidth } = Dimensions.get("window");
const ITEM_SIZE = screenWidth * 0.8;
const ITEM_SPACING = (screenWidth - ITEM_SIZE) / 2;

const NewHome = ({ navigation }) => {
	
	
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
	*[_type == 'category']   {
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
	*[_type == 'weeklyCurrentAffair']  | order(_createdAt desc) {
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
			<View style={{
				flex:1,
				justifyContent:"center",
				alignContent:"center"
			}}>
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

{DataLoaded?( 
	
	
	<View
        style={{
            
            justifyContent:"center",
            alignItems:"center"
        }}
        >

     
        <ActivityIndicator size="large" color="#471598" />
        </View>):(
		
// 		<View className="bg-[#FAF9F6]  ">
// 			
// 			<View
		
			
// 			>
			


			// </View>
			
			
		// </View>
		
		
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
<View style={{ flex: 1 }} >
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
					Weekly Current Affairs
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
									height: 180,
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
</View>
<View style={{ flex: 2  }} >
<View
		style={{
	
		}}
			
			>{/* <Text className="text-xl font-semibold mx-3 text-[#471598] mt-3">Quizes</Text> */}
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					width: SIZES.width,
					justifyContent: "space-between",
					
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

		<View
		style={{
			marginBottom:71
		}}
		
		
		>
		<FlatList
					data={Datas}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					renderItem={(g) => {
						return (
							<View
								style={{
									width: columnWidth,
									
									
									justifyContent: "center",
									alignItems: "center",
									
								}}
							>
								<TouchableOpacity
									onPress={() =>{
										
										navigation.navigate("FrontTitle", { data: g.item.title })
									}
									}
								>
									<View
										style={{
										    display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: 4,
                                        backgroundColor: "#471598",
                                        borderRadius: 8,
                                        paddingVertical: 10,
                                        width: SIZES.width / 2 - 16,
                                    }}
									>
										<View>
											<Image
												source={{
													uri: `${g.item.imageUrl}`,
												}}
												style={{
													height: 85,
													width: 85,
													
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
				



	
{/* 
{interstitialLoaded ? <Button title="Show Interstitial" onPress={() => interstitial.show()}/> : <Text>Loading Interstitial...</Text>} */}
			</View>


</View>

</SafeAreaView>
		
		
		
		
		
		
		
		)}

		</View>
		
	);
};


export default NewHome;
