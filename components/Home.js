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
import client from "./QuestionItem";
import QuesScreen from "../Helper/QuesScreen";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
const { height, width } = Dimensions.get("window");

const Home = ({ route, navigation }) => {
  const { data } = route.params;

  let [FontLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });

  const [questions, setQuestions] = useState([]);
  const [datax, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [quesFetched, setQuesFetched] = useState([]);
  const [lastIndex, setlastIndex] = useState([]);
  const [QuestionAttempted, setQuestionAttempted] = useState(0);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);



  // console.log(QuestionAttempted,"ATTEMPTED")

  
  const [result, SetResult] = useState(0);
  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'exam']{
          _id,
          title,
          questions,
          categories[0]->{
            title
          }
        }
      `
      )
      .then((Geted) => {
        setDataLoaded(false);
        setData(Geted);
        const filteredData = Geted.filter((item) => item.title === data);
        const [{ questions }] = filteredData;
        console.log(questions)
        setQuesFetched(questions);
        setlastIndex(questions.length);
      });
  }, []);

  // useEffect(() => {
  //   console.log(userAnswers);
  // }, [userAnswers]);

  const SOLUTION = (option, index) => {
    const question = allQuestions[index - 1];
    const answer = {
      index: index,
      question: question.question,
      options: question.options,
      selectedOption: option,
      correctOption: question.correct,
      marked:question.marked
      
    };

    const existingAnswerIndex = userAnswers.findIndex(
      (ans) => ans.index === index
    );
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = userAnswers.map((ans, idx) =>
        idx === existingAnswerIndex ? answer : ans
      );
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    }
  };

  // console.log(result)

  const allQuestions = quesFetched;

  const [timer, setTimer] = useState(120 * 60); // 1 hour in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          setIsTimerOver(true);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const [currentIndex, setCurrentIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(allQuestions.length).fill("")
  );

  const listRef = useRef(null);

  const onSelectOption = (index, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;
    setSelectedOptions(updatedOptions);
  };

  const calculateScore = () => {
    let score = 0;
    let answeredQuestions = 0; 
    allQuestions.forEach((question, index) => {
      if (selectedOptions[index] !== undefined) {
        answeredQuestions++;
        if (question.correct === selectedOptions[index]) {
          score += 4;
        } else {
          score -= 1;
        }
      }
    });

    // If no questions were answered, reset the score to 0
    if (answeredQuestions === 0) {
      score = 0;
      return 0;
    }
    setQuestionAttempted(answeredQuestions)
    return score;
  };

  // console.log(result,"RESUlt")
  useEffect(() => {
    const getTextScore = () => {
      const score = calculateScore();
      if (score >= 0) {
        return `+${score}`;
      } else {
        return score;
      }
    };

    SetResult(getTextScore);
  }, [calculateScore]);

  const handleReset = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to reset?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => {
            setSelectedOptions(Array(allQuestions.length).fill(""));
            setCurrentIndex(1);
            setModalVisible(false);
            setIsTimerOver(false);
            setTimer(60 * 60);
            SetResult(0);
            setUserAnswers([]);
            listRef.current.scrollToIndex({
              animated: true,
              index: 0, // Scroll to the first question
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (isTimerOver) {
      setModalVisible(true); // Trigger submission when timer ends
    }
  }, [isTimerOver]);

  const renderOptions = ({ item, index }) => {
    return item.options.map((option) => (
      <TouchableOpacity
        key={option}
        style={{
          width: "90%",
          height: 60,
          elevation: 3,
          backgroundColor:
            selectedOptions[index] === option ? "purple" : "#fff",
          marginTop: 10,
          marginBottom: 10,
          alignSelf: "center",
          alignItems: "center",
          paddingLeft: 5,
          flexDirection: "row",
          borderRadius: 6,
          // borderWidth:2,
          // borderColor:"gray"
        }}
        onPress={() => {
          onSelectOption(index, option);
          SOLUTION(option, currentIndex);
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 10,
            padding:2,
            color: selectedOptions[index] === option ? "white" : "black",
            fontFamily: "Nunito_800ExtraBold",
          }}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ));
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
      {/* Upper Section */}
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
            {allQuestions.length}
          </Text>
          
            </View>

            
           <View style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"baseline"
            }}>

<Pressable onPress={handleReset}>
   <View style={{
      marginRight:10,
      backgroundColor:COLORS.primary,
      paddingVertical:3,
      borderRadius:7
    }}>
        <Text style={{
          paddingHorizontal:10,
          color:"white"
        }}>Reset</Text>
  
    </View>
      </Pressable>
          <Text style={{
            // fontWeight:600,
            fontSize:17,
            color:"#F70D1A",
            fontFamily:"Nunito_800ExtraBold",
            
          }}>{formatTime(timer)}</Text>



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
          data={allQuestions}
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
        {currentIndex >= 2 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        ) : null}

        {lastIndex == currentIndex ? null : (
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
              if (allQuestions[currentIndex - 1].marked !== -1) {
                if (currentIndex < allQuestions.length) {
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
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{ backgroundColor: "#fff", width: "90%", borderRadius: 10 ,height:"80%"}}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              Text Score
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
                color: result >= 0 ? "green" : "red",
              }}
            >
              {result}/{allQuestions.length}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={() => {
                navigation.navigate("ResultScreen", {
                  userAnswers: userAnswers,
                });
                setModalVisible(false)
              }}
            >
              <Text>SOLUTION</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
