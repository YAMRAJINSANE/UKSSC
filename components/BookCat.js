import { View, Text, TouchableOpacity, StatusBar, Image,
      ActivityIndicator, SafeAreaView ,	Dimensions, Pressable} from "react-native";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, 
    AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

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
	requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

//   const adUnitId = "ca-app-pub-4025006836400501~1725295344";

const numColumns = 2

const { width: screenWidth } = Dimensions.get("window");
const ITEM_SIZE = screenWidth * 0.8;

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

      const hadlePress = (g)=>{
        navigation.navigate("BookStack", { data: g.item.title })

      }
    //   const hadlePressNews = ()=>{
        
    //   }

	if (!FontLoaded) {
		return (
            <View
            style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center"
            }}
            >
				   <ActivityIndicator size="large" color="#471598" />
			</View>
		);
	}

	return (
		<SafeAreaView
        
        style={{
            flex:1
        }}
        >
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

          

			
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
        
            <SafeAreaView
            style={{ flex: 1 }}
            >
<Text
				style={{
					fontFamily: "Nunito_800ExtraBold",
					fontSize: 20,
					marginLeft: 10,
					marginTop: 10,
					color: "black",
				}}
			>
			Newspapers
			</Text>


<Pressable
						      onPress={() =>{
                                interstitialLoaded ? (
                                    navigation.navigate("newspaper"),
                                    interstitial.show()

                                ):(
                                    navigation.navigate("newspaper")
                               


                                )
                                
                            }
                            }
                              
						>
							<View
								style={{
									width: SIZES.width-20,
									marginHorizontal: 10,
									borderRadius: 10,
									justifyContent: "center",
									alignItems: "center",
								elevation:4,
									height:200,
                                    marginTop:10
								}}
							>
								<Image
									source={require("../assets/news.jpg")}


									style={{
										height: "100%",
										width: "100%",
                                        
										borderRadius: 10,
									}}
								/>
								
						
							</View>
						</Pressable>

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
            <View style={{ flex: 2  }} >
            <FlatList
            data={Datas}
    showsVerticalScrollIndicator={false}
            renderItem={(g) => {
                return (
                    <TouchableOpacity
                        onPress={() =>{
                            
                            interstitialLoaded ? (
                                navigation.navigate("BookStack", { data: g.item.title }),

                                interstitial.show()

                            ):(
                                navigation.navigate("BookStack", { data: g.item.title })
                                

                            )
                            // if (interstitialLoaded == true) {
							// hadlePress(g)
                            // interstitial.show()
							// } else {
                            //     hadlePress(g)
                            //     console.log("Noy")

							// }
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
                 
       
        
        </SafeAreaView>
        
        )}


		
		</SafeAreaView>
	);
};

export default BookCat;
