import { useMovies } from '@/hooks/useMovies';
import { Link, router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const { data: movies } = useMovies();

  return (
    <SafeAreaView className="flex-1 bg-purple-50">
      <FlatList
        data={movies}
        keyExtractor={(student) => student.id}
        renderItem={({ item }) => (
          <View key={item.id} className='p-4 font-sans'>
            <TouchableOpacity onPress={() => router.push(`/movie-details/${item.id}`)} className="flex-row items-center pb-7 border-b border-purple-300">
              <View className='rounded-3xl border-2 border-purple-500'>
                <Image source={{ uri: item.image }} style={{ height: 100, width: 150, borderRadius: 20 }} />
              </View>

              <View className='flex px-4 '>

                <Text className="text-xl font-bold text-purple-800">
                  {item.name}
                </Text>

                <View className=' '>

                  <Text className="text-base font-semibold text-purple-500">
                    Type: <Text className="text-base font-normal  text-purple-500">{item.type}</Text>
                  </Text>
                  <Text className="text-base font-semibold text-purple-500">
                    Rating:  <Text className="text-base font-normal text-purple-500">{item.rating}</Text>
                  </Text>
                </View>

              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      <Link href={'/add'} asChild>
        <TouchableOpacity className="absolute bottom-12 right-4 h-16 w-16 items-center justify-center rounded-full bg-[#7c3aed] p-4">
          <Text className="text-2xl text-white">+</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default Index;