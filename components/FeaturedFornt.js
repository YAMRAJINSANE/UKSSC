import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import client from "./QuestionItem";
import { COLORS, SIZES } from "./Constant";
import { FlatList } from "react-native";
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_SIZE = screenWidth * 0.8;
const ITEM_SPACING = (screenWidth - ITEM_SIZE) / 2;

const FeaturedFornt = ({ navigation }) => {
	const [FtechedData, setFtechedData] = useState([]);

	let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});

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
				setFtechedData(res);
				
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
			<Text
				style={{
					fontFamily: "Nunito_800ExtraBold",
					paddingHorizontal: 10,
					fontSize: 20,
					color: "white",
					marginTop: 10,
				}}
			>
				Weekly Curent Affairs
			</Text>

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
									borderRadius: 10,
									flex: 1,
									marginTop: 10,
									paddingHorizontal: 10,
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

								<Text
									style={{
										fontFamily: "Nunito_800ExtraBold",
										paddingHorizontal: 10,
										fontSize: 16,
										color: "white",
										marginTop: 2,
									}}
								>
									{h.item.title}
								</Text>
							</View>
						</Pressable>
					);
				}}
			/>
		</View>
	);
};

export default FeaturedFornt;
