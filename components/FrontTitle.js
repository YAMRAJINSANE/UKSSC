import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect,useState } from 'react'
import client from './QuestionItem';
import { FlatList } from 'react-native';
import { COLORS, SIZES } from "./Constant";
import {useFonts,Nunito_600SemiBold,Nunito_800ExtraBold} from "@expo-google-fonts/nunito"


const FrontTitle = ({navigation,route}) => {


let [FontLoaded] = useFonts({
	Nunito_600SemiBold,
	Nunito_800ExtraBold
})

  const {data} = route.params;
  console.log("djsh",data)

    const [Datas, setDatas] = useState([])


    useEffect(() => {
        client.fetch(`
        *[_type == 'exam']{
            _id,
            title,
            categories[0]->{
              title
              }
         
           
          }
      `).then((res)=>{
        setDatas(res)
        console.log(res)
      });
    }, [])

    const FilData = Datas.filter((g)=>g.categories.title == data)
    console.log(FilData,"FIfsja")


    if(!FontLoaded){
      return(
        <View>
          <Text>Loading</Text>
        </View>
      )
    }
    

  return (
    <View className="bg-[#1F1047] relative  flex-1">
      			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

				<Text style={{fontFamily:"Nunito_800ExtraBold",fontSize:20,marginLeft:10,marginTop:10,color:"white"}}>{data}</Text>
			
            <FlatList
            data={FilData}
            renderItem={(g)=>{
            
                return(
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("Front",{data:g.item.title})}
                    
                    > 

                    
<View className="mt-3 h-[110px] mx-3  bg-[#6849FA] rounded-md flex justify-center items-center">
                   
                   
                    <Text className="text-xl text-white font-semibold ">
                    {g.item.title}
                        </Text>
                         </View>
                         </TouchableOpacity>
                )
            }}
            
            />
           
        </View>
  )
}

export default FrontTitle