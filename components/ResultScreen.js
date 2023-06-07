import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Alert,
  Button,
  Pressable,
} from "react-native";
import { COLORS, SIZES } from "./Constant";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";


const { height, width } = Dimensions.get("window");

const ResultScreen = ({ route, navigation }) => {


  const { userAnswers } = route.params;




useEffect(()=>{
  console.log(userAnswers)

},[])


  let [FontLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });

  const [questions, setQuestions] = useState([]);
  const [datax, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [quesFetched, setQuesFetched] = useState([]);
  const [lastIndex, setlastIndex] = useState([]);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [QuesGeted,setQuesGeted]= useState([])

  const [result, SetResult] = useState(0);

  const allQuestions = userAnswers.question;

 
console.log(allQuestions)


    const [currentIndex, setCurrentIndex] = useState(1);
    const listRef = useRef(null);

  







      const renderOptions = ({ item, index }) => {
      const selectedOption = item.selectedOption;
      const correctOption = item.correctOption;
      return item.options.map((option) => {
      const isCorrect = option === correctOption;
      const isSelected = option === selectedOption;
      const backgroundColor = isCorrect ? COLORS.success : isSelected ? COLORS.error : "#fff";
      const textColor = isSelected ? "white" : "black";
  
      return (
        <View
          key={option}
          style={{
            width: SIZES.width-20,
            height: 60,
            elevation: 3,
            backgroundColor,
            marginTop: 10,
            marginBottom: 10,
            alignSelf: "center",
            alignItems: "center",
            paddingLeft: 5,
            flexDirection: "row",
            borderRadius: 6,
          }}
        >
       
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 10,
              padding: 2,
              color: textColor,
              fontFamily: "Nunito_800ExtraBold",
            }}
          >
            {option}
          </Text>

          {isSelected && (
            <MaterialCommunityIcons
              name={isCorrect ? "check" : "cross"}
              style={{
                color: COLORS.white,
                fontSize: 20,
                marginRight: 10,
              }}
            />
          )}
  
        </View>
      );
    });
  };
  
  if (!FontLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
     
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          width: SIZES.width,
        }}
      >


        <View
          style={{
            justifyContent: "space-between",
            width: width,// marginHorizontal: 10,
            paddingHorizontal:20,
            flexDirection:"row"
          }}
        >
           <View style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"baseline"
            }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "600",
              color: "#000",
            }}
          >
            {currentIndex}/
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
             
              color: "#000",
            }}
          >
            {userAnswers.length}
          </Text>
          
            </View>

        </View>
      </View>
   
      <View style={{ marginTop: 10,flex:1 }}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={userAnswers}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: width}}>
                <Text
                  style={{
                    fontSize:19,
                    fontWeight:"600",
                    color:"black",
                    marginLeft:20,
                    marginRight:20,
                    fontFamily:"Nunito_800ExtraBold",
                  }}
                >
                  {item.question}
                </Text>

                {renderOptions({ item, index })}
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: 50,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex > 1 ? "purple" : "gray",
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 2,
              });
            }
          }}
        >
          <Text style={{ color: "#fff" }}>Previous</Text>
        </TouchableOpacity>
      

        
          <TouchableOpacity
            style={{
              backgroundColor: "purple",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (userAnswers[currentIndex - 1].marked !== -1) {
                if (currentIndex < userAnswers.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Next</Text>
          </TouchableOpacity>
       
      </View>
 
    </View>
  );
};

export default ResultScreen;
