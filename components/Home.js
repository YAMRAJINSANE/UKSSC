import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, Animated, Modal } from 'react-native';
import { SIZES } from './Constant';
import client from './QuestionItem';
import QuesScreen from '../Helper/QuesScreen';
import {
	useFonts,
	Nunito_600SemiBold,
	Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
const { height, width } = Dimensions.get('window');

const Home = ({ route }) => {
  const { data } = route.params;

  let [FontLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_800ExtraBold,
	});
  // const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState([]);
  // const listRef = useRef(null);
  // const [modalVisible, setModalVisible] = useState(false);
  const [datax, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [quesFetched, setQuesFetched] = useState([]);
  const [lastIndex, setlastIndex] = useState([]);



  console.log("Currnet Index",currentIndex)
  console.log("last Index",lastIndex)

  useEffect(() => {
    client
      .fetch(`
        *[_type == 'exam']{
          _id,
          title,
          questions,
          categories[0]->{
            title
          }
        }
      `)
      .then((Geted) => {
        setDataLoaded(false);
        setData(Geted);
        const filteredData = Geted.filter((item) => item.title === data);
        const [{ questions }] = filteredData;
        setQuesFetched(questions);
        setlastIndex(questions.length)
      });
  }, []);

  const allQuestions = quesFetched;



  const [currentIndex, setCurrentIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(Array(allQuestions.length).fill(''));

  const listRef = useRef(null);

  const onSelectOption = (index, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;
    setSelectedOptions(updatedOptions);
  };

  const calculateScore = () => {
    let score = 0;
    allQuestions.forEach((question, index) => {
      if (question.correct === selectedOptions[index]) {
        score += 2;
      } else {
        score -= 0.25;
      }
    });
    return score.toFixed(2);
  };

  const getTextScore = () => {
    const score = calculateScore();
    if (score >= 0) {
      return `+${score}`;
    } else {
      return score;
    }
  };

  const renderOptions = ({ item, index }) => {
    return item.options.map((option) => (
      <TouchableOpacity
        key={option}
        style={{
          width: '90%',
                  height: 60,
                  elevation: 3,
          backgroundColor: selectedOptions[index] === option ? 'purple' : '#fff',
          marginTop: 10,
          marginBottom: 10,
          alignSelf: 'center',
          alignItems: 'center',
          paddingLeft: 5,
          flexDirection: 'row',
          borderRadius:20,
          // borderWidth:2,
          // borderColor:"gray"
        }}
        onPress={() => onSelectOption(index, option)}
      >
        <Text
        style={{
          fontSize: 18, fontWeight: '600', marginLeft: 20,color:selectedOptions[index] === option ? 'white' : 'black',  fontFamily:"Nunito_800ExtraBold"
        }}
        >
          
          
          {option}</Text>
      </TouchableOpacity>
    ));
  };

  if (!FontLoaded) {
		return (
			<View style={{
				flex:1,
				justifyContent:"center",
				alignContent:"center"
			}}>
				<Text>Loading</Text>
			</View>
		);
	}


  return (
    <View style={{ flex: 1 }}>
      {/* Upper Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <View style={{ justifyContent: 'space-between', width: width, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 20, color: '#000' }}>
            {data}: {currentIndex}/{allQuestions.length}
          </Text>
        </View>
        <Text
          style={{ marginRight: 20, fontSize: 20, fontWeight: '600', color: 'black' }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({ animated: true, index: 0 });
          }}
        >
          Reset
        </Text>
      </View>

      <View style={{ marginTop: 30 }}>
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
              <View style={{width: width}}>
                  <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: 'black',
          marginLeft: 20,
          marginRight: 20,
          fontFamily:"Nunito_800ExtraBold"
        }}>
             Ques.{currentIndex} {item.question}</Text>


                {renderOptions({ item, index })}
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex > 1 ? 'purple' : 'gray',
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
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
          <Text style={{ color: '#fff' }}>Previous</Text>
        </TouchableOpacity>
{currentIndex >= 2 ?
 <TouchableOpacity
 style={{
    backgroundColor: 'green',
    height: 50,
    width: 100,
    borderRadius: 10,
  marginRight: 20,
    justifyContent: 'center',
alignItems: 'center',
  }}
  onPress={() => {
    setModalVisible(true);
}}
>
 <Text style={{ color: '#fff' }}>Submit</Text>
</TouchableOpacity> : null
}
          
        
        {lastIndex == currentIndex ? ( null
    
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'purple',
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
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
            <Text style={{ color: '#fff' }}>Next</Text>
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
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ backgroundColor: '#fff', width: '90%', borderRadius: 10 }}>
            <Text style={{ fontSize: 30, fontWeight: '800', alignSelf: 'center', marginTop: 20 }}>Text Score</Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
                color: 'green',
              }}
            >
              {getTextScore()}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
