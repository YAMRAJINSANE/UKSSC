import { View, Text, TouchableOpacity, StatusBar, Image,ActivityIndicator, SafeAreaView, ScrollView, Linking, } from "react-native";
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












const Newspaper = ({ navigation, route }) => {
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
                *[_type =='newspaper'] | order(_createdAt desc) {
        
                    title,
                    categories[0]->{
                    title        
                    },
                      papers
                            }
      `
			)
			.then((res) => {
				setDatas(res);
				
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
		<View className="bg-[#1F1047] relative  flex-1">
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
		
		

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



		<View>

<Text style={{
				fontSize:20,
				fontFamily:"Nunito_800ExtraBold",
				color:"white",
				marginLeft:20,
        marginTop:2
        }}>Daily Newspaper</Text>
		<FlatList
  data={Datas}
  keyExtractor={(item) => item.title}
  renderItem={({ item }) => {
    const { title, papers } = item;
    const date = new Date(title);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;

    return (
        <View key={title}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Nunito_800ExtraBold",
            color: "white",
            marginLeft: 20,
            marginTop: 10,
          }}
        >
          Date - {formattedDate}
        </Text>
        <FlatList
          data={papers}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View
              style={{
                width: columnWidth,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => Linking.openURL(item.href)}>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 8,
                    backgroundColor: "#471598",
                    borderRadius: 8,
                    paddingVertical: 20,
                    width: SIZES.width / 2 - 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Nunito_800ExtraBold",
                      fontSize: 17,
                      color: "white",
                      marginTop: 3,
                    }}
                  >
                    {item.paperName}
                  </Text>
                </View>
              </TouchableOpacity>
</View>
          )}
          numColumns={2}
        />
      </View>
    );
  }}
/>

	
			
			</View>
			
			

			
			)}
			
			
		</View>
	);
};

export default Newspaper;
