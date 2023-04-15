import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated } from 'react-native'
import React, { useState ,useEffect} from 'react'
import fata from "./Quiz"
import {COLORS, SIZES }from "./Constant"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFonts,Nunito_600SemiBold,Nunito_800ExtraBold} from "@expo-google-fonts/nunito"

	

// import  { createClient } from '@sanity/client'
import 'url-search-params-polyfill';
import client from './QuestionItem';
// const client = createClient({
//   projectId: 'j856t9gr',
//   dataset: 'production',
//   apiVersion: '2023-01-30', // use current UTC date - see "specifying API version"!
//    // or leave blank for unauthenticated usage
//   useCdn: true, // `false` if  // use current date (YYYY-MM-DD) to target the latest API version
// })


const Home = ({route}) => {

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
  const [answers, setAnswers] = useState([]);
  const [QuesFetched, setQuesFetched] = useState([]);


console.log(RightOption,"right Option")



useEffect(() => {
  
    client.fetch(`
    *[_type == 'exam']{
      _id,
      title,
      questions,
      categories[0]->{
        title
        }
    }
  `).then((Geted)=>{
   setData(Geted)
    const filteredData = Geted.filter((item) => item.title == data);
    
    
    const [{questions}] = filteredData
    setQuesFetched(questions)
   
  });
}, []);

const allQuestions = QuesFetched;

const validateAnswer = (selectedOption) => {


    console.log(selectedOption,"Selected OP")
    
   
    setCurrentOptionSelected(selectedOption);

   

    setIsOptionsDisabled(true);
    if(selectedOption == RightOption){
        // Set Score
        setScore(score + 1)
        
    }
    
    // Show Next Button
    setShowNextButton(true)
}
console.log(score,"Score")
// Destructuring questions array
// const [ { question: question1, options: options1, correct: correct1 }, { question: question2, options: options2, correct: correct2 } ] = questions;

// console.log(question1, options1, correct1);
// console.log(question2, options2, correct2);

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
          marginVertical: 40
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
              fontSize: 25
          }}>{allQuestions[currentQuestionIndex]?.question}</Text>
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
                      <Text style={{fontSize: 20, color: COLORS.white,fontFamily:"Nunito_800ExtraBold"}}>{option}</Text>

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
     <View style={{
         flex: 1,
         paddingVertical: 5,
         paddingHorizontal: 16,
         backgroundColor: COLORS.background,
         position:'relative'
     }}>
<View>
  <Text>{datax.title}</Text>
</View>
         {/* ProgressBar */}
         {/* { renderProgressBar() } */}

         {/* Question */}
         {renderQuestion()}

         {/* Options */}
         {renderOptions()}

         {/* Next Button */}
         {renderNextButton()}

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

         {/* Background Image */}
         <Image
          source={require('../assets/DottedBG.png')}
          style={{
              width: SIZES.width,
              height: 130,
              zIndex: -1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              opacity: 0.5
          }}
          resizeMode={'contain'}
          />

     </View>
 </SafeAreaView>
)
}

export default Home