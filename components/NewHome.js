import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import client from "./QuestionItem";
import { FlatList } from "react-native";
import { COLORS, SIZES } from "./Constant";

const NewHome = ({ navigation }) => {
	const [Datas, setDatas] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`
        *[_type == 'category']{
            _id,
            title,
           "imageUrl": image.asset->url
           
          }
      `
			)
			.then((res) => {
				setDatas(res);
				console.log(res, "gjhfg");
			});
	}, []);

	return (
		// <ImageBackground source={require('../assets/sd.jpg')} style={{ flex: 1 }}>

		<View className="bg-[#1F1047] relative  flex-1">
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

			<View className="mt-3 h-[80px]  mx-2  bg-[#38E9BB] rounded-md flex justify-center items-center">
				<Text className="text-3xl  font-semibold ">Quizlers</Text>
			</View>
<Text className="text-xl font-semibold mx-3 text-white mt-3">Quizes</Text>
			<FlatList
				data={Datas}
				numColumns={2}
				renderItem={(g) => {
					return (
						<View className="p-2">
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("FrontTitle", { data: g.item.title })
								}
							>
								<View className="mt-3 h-[110px] w-[180px]   bg-[#6849FA] rounded-md flex justify-center items-center">
									<View>
										<Image
											source={{
												uri: `${g.item.imageUrl}`,
											}}
											style={{
												height: 70,
												width: 70,
                                                borderRadius:10
											}}
										/>
									</View>
									<Text className="text-[15px] mt-2 text-white font-semibold ">
										{g.item.title}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</View>
		// </ImageBackground>
	);
};

export default NewHome;
