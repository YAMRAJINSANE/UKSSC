import { View, Text, Pressable, Image, Dimensions ,ActivityIndicator, StyleSheet} from "react-native";
import React from "react";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

import { useEffect, useState } from "react";
import client from "./QuestionItem";
import { COLORS, SIZES } from "./Constant";
import { FlatList } from "react-native";
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";


const adUnitId = 'ca-app-pub-4025006836400501~1725295344';


const { width: screenWidth } = Dimensions.get("window");
const ITEM_SIZE = screenWidth * 0.8;
const ITEM_SPACING = (screenWidth - ITEM_SIZE) / 2;

const FeaturedFornt = ({ navigation }) => {
	const [FtechedData, setFtechedData] = useState([]);
	const [DataLoaded, setDataLoaded] = useState(true);

	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	useEffect(() => {
		client
			.fetch(
				`
        *[_type == 'weeklyCurrentAffair'] | order(_createdAt desc) {
            _id,
            title,
           "imageUrl": image.asset->url
           
          }
      `
			)
			.then((res) => {
				setFtechedData(res);
				setDataLoaded(false)
			});
	}, []);

	if (!FontLoaded) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}
	return (
		<View style={{ flex: 1,backgroundColor:"#1F1047" }}>

<View
style={{
	position:"absolute",
	bottom:0,
	flex:1

}}

>
<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
	</View>
			<Text
				style={{
					fontFamily: "Nunito_800ExtraBold",
					paddingHorizontal: 20,
					fontSize: 20,
					color: "white",
					marginTop: 10,
				}}
			>
				Daily Curent Affairs
			</Text>
			{DataLoaded?( 
        <View
        style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }}
        >

     
        <ActivityIndicator size="large" color="#471598" />
        </View>
        
        
        ):(
		<View
		
		style={{
			marginBottom:4,
			flex:1,
		
		}}
		
		
		>

			



			<FlatList
			data={FtechedData}
			renderItem={(h) => {
				return (
					<Pressable
						onPress={() =>
							navigation.navigate("FetauredQuizes", { data: h.item.title })
						}
					>
						<View
							style={{
								width: SIZES.width,
								borderRadius: 4,
								flex: 1,
								marginTop: 10,
								paddingHorizontal: 10,
								height: 180,
							}}
						>
							<Image
								source={{
									uri: `${h.item.imageUrl}`,
								}}
								style={{
									height: 180,
									width: "100%",
									borderRadius: 10,
								}}
							/>

<View
								style={{
									...StyleSheet.absoluteFillObject,
									alignItems: 'center',
									justifyContent: 'center',
									
								}}
								>
		<Text
								style={{
								
									
									
									fontFamily: "Nunito_800ExtraBold",
									color:"white",
									fontSize:26
								
								}}
								>{h.item.title}</Text>
								</View>
						

						</View>
					</Pressable>
				);
			}}
		/>


			</View>
		)}
			
		</View>
	);
};

export default FeaturedFornt;
