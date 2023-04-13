import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import client from './QuestionItem';
import { FlatList } from 'react-native';


const NewHome = ({navigation}) => {

    const [Datas, setDatas] = useState([])


    useEffect(() => {
        client.fetch(`
        *[_type == 'category']{
            _id,
            title,
           "imageUrl": image.asset->url
           
          }
      `).then((res)=>{
        setDatas(res)
        console.log(res)
      });
    }, [])

    return (
        <View className="flex-1 mx-3">
            <FlatList
            data={Datas}
            renderItem={(g)=>{
            
                return(
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("FrontTitle",{data: g.item.title})}
                    
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

export default NewHome