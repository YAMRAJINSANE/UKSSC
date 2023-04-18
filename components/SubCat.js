import { View, Text, TouchableOpacity, StatusBar, Image,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import client from "./QuestionItem";
import { FlatList } from "react-native";
import { COLORS, SIZES } from "./Constant";
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

const SubCat = ({ navigation, route }) => {
	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	const { data } = route.params;


	const [DataLoaded, setDataLoaded] = useState(true);


	const [Datas, setDatas] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`
        *[_type == 'exam']{
            _id,
            title,
            categories[0]->{
              title
              }, 
              
              categoriesHead[0]->{
                title,
                "imageUrl": image.asset->url
                   }, 
          }
      `
			)
			.then((res) => {
				
				setDatas(res);
				setDataLoaded(false)
				
			});
	}, []);

	const FilData = Datas.filter((g) => g.categoriesHead.title == data);
	

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
            alignItems:"center"
        }}
        >

     
        <ActivityIndicator size="large" color="#471598" />
        </View>):(
	<FlatList
	data={FilData}

	renderItem={(g) => {
		return (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("Front", { data: g.item.title })
				}
			>
				<View className="mt-3 h-[110px] mx-3  bg-[#6849FA] rounded-md flex justify-center items-center">
					{/* <Text className="text-xl text-white font-semibold ">
						{g.item.categoriesHead.title}
					</Text> */}
		<View
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								margin: 8,
								
								borderRadius: 8,
								paddingVertical: 10,
								// width: SIZES.width / 2 - 20,
							}}
						>
							
							<Text
								style={{
									fontFamily: "Nunito_800ExtraBold",
									fontSize: 20,
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

/>

		)}

		
		</View>
	);
};

export default SubCat;
