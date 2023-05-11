import { View, Text, TouchableOpacity, StatusBar, Image,ActivityIndicator, SafeAreaView, } from "react-native";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

import React, { useEffect, useState } from "react";
import client from "./QuestionItem";
import { FlatList } from "react-native";
import { COLORS, SIZES } from "./Constant";
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";



const numColumns = 2

const adUnitIdIn = "ca-app-pub-8098715833653221/8702994590";

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIn, {
	requestNonPersonalizedAdsOnly: false
  });


  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';











const FrontTitle = ({ navigation, route }) => {
	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	const { data } = route.params;
	

	const [columnWidth, setColumnWidth] = useState(0);
	const [Datas, setDatas] = useState([]);
	const [DataLoaded, setDataLoaded] = useState(true);
	const [interstitialLoaded, setInterstitialLoaded] = useState(false);


  useEffect(() => {
		setColumnWidth(SIZES.width / numColumns);
	}, []);
	useEffect(() => {
		client
			.fetch(
				`
				*[_type == 'CategoryHead'] | order(_createdAt asc) {
					title,
					  "imageUrl": image.asset->url,
						 categories[0]->{
						   title
						 }
						
					   }
      `
			)
			.then((res) => {
				setDatas(res);
				setDataLoaded(false)
			
			});
	}, []);

	const FilData = Datas.filter((g) => g.categories.title == data);
	

	const loadInterstitial = () => {
		const unsubscribeLoaded = interstitial.addAdEventListener(
		  AdEventType.LOADED,
		  () => {
			setInterstitialLoaded(true);
		  }
		);
	
		const unsubscribeClosed = interstitial.addAdEventListener(
		  AdEventType.CLOSED,
		  () => {
			setInterstitialLoaded(false);
			interstitial.load();
		  }
		);
	
		interstitial.load();
	
		return () => {
		  unsubscribeClosed();
		  unsubscribeLoaded();
		}
	  }
	
	  useEffect(() => {
		const unsubscribeInterstitialEvents = loadInterstitial();
		
	
		return () => {
		  unsubscribeInterstitialEvents();
		 
		};
	  }, [])

const  hadlePress=(g)=>{
	

		
	
}


	if (!FontLoaded) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}

	return (
		<View className="bg-[#1F1047] relative  flex-1">
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

			<Text
				style={{
					fontFamily: "Nunito_800ExtraBold",
					fontSize: 20,
					marginLeft: 10,
					marginTop: 10,
					color: "white",
				}}
			>
				{data}
			</Text>

			{DataLoaded?(      <View
        style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
			backgroundColor:"#1F1047"
        }}
        >

     
        <ActivityIndicator size="large" color="#471598" />
        </View>):(	
		
		<SafeAreaView
		style={{marginBottom:44}}
		>

		
			
			<FlatList
					data={FilData}
			
					renderItem={(g) => {
						return (
							<TouchableOpacity
							onPress={() => {

								interstitialLoaded ? (
                                    navigation.navigate("SubCat", { data: g.item.title }),
                                    interstitial.show()

                                ):(
                                    navigation.navigate("SubCat", { data: g.item.title })

                                )


								// if (interstitialLoaded) {
								//   interstitial.show();
								//   hadlePress(g)
								// } else {
								//   console.log('Interstitial not loaded yet');
								//   hadlePress(g)
								// }
							  }}
							>
									<View
									style={{
										width: columnWidth,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
					  
									}}
								>
									{/* <Text className="text-xl text-white font-semibold ">
										{g.item.categoriesHead.title}
									</Text> */}
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
														width: 100,
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
								</View>
							</TouchableOpacity>
						);
					}}
			numColumns={2}
				/>
			</SafeAreaView>
			
			)}
			

		</View>
	);
};

export default FrontTitle;
