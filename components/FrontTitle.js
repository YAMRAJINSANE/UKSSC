import { View, Text, TouchableOpacity, StatusBar, Image,ActivityIndicator, } from "react-native";
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
const FrontTitle = ({ navigation, route }) => {
	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

	const { data } = route.params;
	

	const [columnWidth, setColumnWidth] = useState(0);
	const [Datas, setDatas] = useState([]);
	const [DataLoaded, setDataLoaded] = useState(true);



  useEffect(() => {
		setColumnWidth(SIZES.width / numColumns);
	}, []);
	useEffect(() => {
		client
			.fetch(
				`
				*[_type == 'CategoryHead']{
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
        </View>):(	<FlatList
				data={FilData}
        
				renderItem={(g) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("SubCat", { data: g.item.title })
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
			/>)}

		
		</View>
	);
};

export default FrontTitle;
