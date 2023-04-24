import { View, Text, TouchableOpacity, StatusBar, Image,  ActivityIndicator } from "react-native";
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

const adUnitIdIn = 'ca-app-pub-8098715833653221/8702994590';


const interstitial = InterstitialAd.createForAdRequest(adUnitIdIn, {
	requestNonPersonalizedAdsOnly: true
  });


  const adUnitId = 'ca-app-pub-8098715833653221/2567178692';
const numColumns = 2
const BookCat = ({ navigation}) => {
	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	

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
                *[_type == 'bookCat'] | order(_createdAt desc) {
                    _id,
                     title,
                        "imageUrl": image.asset->url,
                  }
      `
			)
			.then((res) => {
				setDatas(res);
                setDataLoaded(false)
			
			});
	}, []);

	// const FilData = Datas.filter((g) => g.categories.title == data);
	
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


	if (!FontLoaded) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}

	return (
		<View className="bg-[#fff] relative  flex-1">
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

			<Text
				style={{
					fontFamily: "Nunito_800ExtraBold",
					fontSize: 20,
					marginLeft: 10,
					marginTop: 10,
					color: "black",
				}}
			>
			Study Material
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
                marginBottom:150
            }}
            
            >
        <FlatList
            data={Datas}
    
            renderItem={(g) => {
                return (
                    <TouchableOpacity
                        onPress={() =>{
                            navigation.navigate("BookStack", { data: g.item.title })
                            interstitial.show()
                        }
                          
                        }
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
                                        height:140
                                    }}
                                >
                                    <View>
                                        <Image

                                            source={{
                                                uri: `${g.item.imageUrl}`,
                                            }}
                                            style={{
                                                height: 100,
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
       
        
        </View>
        
        )}

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
		
		</View>
	);
};

export default BookCat;
