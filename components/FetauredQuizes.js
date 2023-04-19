import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView,ActivityIndicator } from 'react-native'
import React, { useState ,useEffect} from 'react'
import fata from "./Quiz"
import {COLORS, SIZES }from "./Constant"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFonts,Nunito_600SemiBold,Nunito_800ExtraBold} from "@expo-google-fonts/nunito"
import * as Localization from "expo-localization"
import {i18n} from "i18n-js"

// import  { createClient } from '@sanity/client'
import 'url-search-params-polyfill';
import client from './QuestionItem';





const FetauredQuizes = ({route}) => {

    const {data} = route.params;
    let [FontLoaded] = useFonts({
        Nunito_600SemiBold,
        Nunito_800ExtraBold
    })

  const params = new URLSearchParams();
  params.set('key', 'value');


  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);

  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0)
  
  const [RightOption, setRightOption] = useState(null)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [datax, setData] = useState([]);
  const [DataLoaded, setDataLoaded] = useState(true);
  const [QuesFetched, setQuesFetched] = useState([]);






useEffect(() => {
  
    client.fetch(`
    *[_type == 'weeklyCurrentAffair']{
      _id,
      title,
      questions,
      categories[0]->{
        title
        }
    }
  `).then((Geted)=>{
      setData(Geted)
      setDataLoaded(false)
    const filteredData = Geted.filter((item) => item.title == data);
    
    
    const [{questions}] = filteredData
    setQuesFetched(questions)
   
  });
}, []);

const allQuestions = QuesFetched;



const validateAnswer = (selectedOption) => {


    // .log(selectedOption,"Selected OP")
    
   
    setCurrentOptionSelected(selectedOption);

   

    setIsOptionsDisabled(true);
    const isOptionCorrect = selectedOption === allQuestions[currentQuestionIndex]?.correct;
    // update score if option is correct
    if (isOptionCorrect) {
     setScore(score+1)
    }
  
    // set right option for the current question
    setRightOption(allQuestions[currentQuestionIndex]?.correct);
  
    setShowNextButton(true)
}

const ScoreUpdate = (option)=>{
    if(option == RightOption){
        setScore(score + 1)
        
    }
}



const handleNext = () => {
    if(currentQuestionIndex== allQuestions.length-1){
        // Last Question
        // Show Score Modal
        setShowScoreModal(true)
    }else{
        setCurrentQuestionIndex(currentQuestionIndex+1);
        setCurrentOptionSelected(null);
       
        setRightOption(null)
        setIsOptionsDisabled(false);
        setShowNextButton(false);
    }
    Animated.timing(progress, {
        toValue: currentQuestionIndex+1,
        duration: 1000,
        useNativeDriver: false
    }).start();
}
const restartQuiz = () => {
    setShowScoreModal(false);
setRightOption(null)
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
   
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
    }).start();
}





const renderQuestion = () => {
  return (
      <View style={{
          marginVertical: 20
      }}>
          {/* Question Counter */}
          <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end'
          }}>
              <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
              <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
          </View>

          {/* Question */}
          <Text style={{
              color: COLORS.white,
              fontFamily:"Nunito_800ExtraBold",
              fontSize: 19
          }}>Ques. {allQuestions[currentQuestionIndex]?.question}</Text>
      </View>
  )
}
const renderOptions = () => {
  return (
      <View>

          {

              allQuestions[currentQuestionIndex]?.options.map((option,optionIndex) => (
                  <TouchableOpacity 
                  onPress={()=>{ 
                    validateAnswer(option,optionIndex)
                    ScoreUpdate(option)
                setRightOption( allQuestions[currentQuestionIndex]?.correct)
                }}
                  disabled={isOptionsDisabled}
                  key={option}
                  style={{
                      borderWidth: 3, 
                      borderColor: option==RightOption 
                      ? COLORS.success
                      : option==currentOptionSelected 
                      ? COLORS.error 
                      : COLORS.secondary+'40',
                      backgroundColor: option==RightOption 
                      ? COLORS.success +'20'
                      : option==currentOptionSelected 
                      ? COLORS.error +'20'
                      : COLORS.secondary+'20',
                      height: 60, borderRadius: 20,
                      flexDirection: 'row',
                      alignItems: 'center', justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginVertical: 10
                  }}
                  >
                      <Text style={{fontSize: 17, color: COLORS.white,fontFamily:"Nunito_800ExtraBold"}}>{option}</Text>

                      {/* Show Check Or Cross Icon based on correct answer*/}
                      {
                          option==RightOption ? (
                              <View style={{
                                  width: 30, height: 30, borderRadius: 30/2,
                                  backgroundColor: COLORS.success,
                                  justifyContent: 'center', alignItems: 'center'
                              }}>
                                  <MaterialCommunityIcons name="check" style={{
                                      color: COLORS.white,
                                      fontSize: 20
                                  }} />
                              </View>
                          ): option == currentOptionSelected ? (
                              <View style={{
                                  width: 30, height: 30, borderRadius: 30/2,
                                  backgroundColor: COLORS.error,
                                  justifyContent: 'center', alignItems: 'center'
                              }}>
                                  <MaterialCommunityIcons name="close" style={{
                                      color: COLORS.white,
                                      fontSize: 20
                                  }} />
                              </View>
                          ) : null
                      }

                  </TouchableOpacity>
              ))
          }
      </View>
  )
}
const renderNextButton = () => {
  if(showNextButton){
      return (
          <TouchableOpacity
          onPress={handleNext}
          style={{
              marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
          }}>
              <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
          </TouchableOpacity>
      )
  }else{
      return null
  }
}


const [progress, setProgress] = useState(new Animated.Value(0));
const progressAnim = progress.interpolate({
  inputRange: [0, allQuestions.length],
  outputRange: ['0%','100%']
})
const renderProgressBar = () => {
  return (
      <View style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',

      }}>
          <Animated.View style={[{
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent
          },{
              width: progressAnim
          }]}>

          </Animated.View>

      </View>
  )
}


if(!FontLoaded){
	return(
		<View>
			<Text>Loading</Text>
		</View>
	)
}


return (
 <SafeAreaView style={{
     flex: 1
 }}>
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
 <View style={{
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    position:'relative'
}}>
<View>
<Text style={{fontWeight:"bold",fontSize:15,color:"white"}}>{data}</Text>
</View>
<ScrollView
showsVerticalScrollIndicator={false}

>


    {/* ProgressBar */}
    {/* { renderProgressBar() } */}

    {/* Question */}
    {renderQuestion()}

    {/* Options */}
    {renderOptions()}

    {/* Next Button */}
    {renderNextButton()}
    </ScrollView>

    {/* Score Modal */}
    <Modal
    animationType="slide"
    transparent={true}
    visible={showScoreModal}
    >
        <View style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                backgroundColor: COLORS.white,
                width: '90%',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center'
            }}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 20
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                    }}>{score}</Text>
                     <Text style={{
                         fontSize: 20, color: COLORS.black
                     }}>/ { allQuestions.length }</Text>
                </View>
                {/* Retry Quiz button */}
                <TouchableOpacity
                onPress={restartQuiz}
                style={{
                    backgroundColor: COLORS.accent,
                    padding: 20, width: '100%', borderRadius: 20
                }}>
                    <Text style={{
                        textAlign: 'center', color: COLORS.white, fontSize: 20
                    }}>Retry Quiz</Text>
                </TouchableOpacity>

            </View>

        </View>
    </Modal>




</View>
     )}
    
 </SafeAreaView>
)
}

export default FetauredQuizes