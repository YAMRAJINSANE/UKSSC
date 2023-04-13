import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import client from './QuestionItem';
import { FlatList } from 'react-native';


const FrontTitle = ({navigation,route}) => {


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

  return (
    <View className="flex-1 mx-3">
            <FlatList
            data={FilData}
            renderItem={(g)=>{
            
                return(
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("Front",{data:g.item.title})}
                    
                    >

                    
                    <View className="mt-3 w-full h-[150px]  bg-yellow-600 rounded-md flex justify-center items-center">
                   
                   
                    <Text className="text-3xl font-semibold ">
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