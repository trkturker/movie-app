import { useStudents } from '@/hooks/useStudents';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const Index = () => {
  const { data: students } = useStudents();

  return (
    <View className="flex-1">
      <FlatList
        data={students}
        keyExtractor={(student) => student.id}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Image source={{ uri: item.image }} style={{ height: 100, width: '100%' }} />
            <Text>
              {item.name} {item.surname}
            </Text>
          </View>
        )}
      />

      <Link href={'/add'} asChild>
        <TouchableOpacity className="absolute bottom-12 right-4 h-16 w-16 items-center justify-center rounded-full bg-blue-500 p-4">
          <Text className="text-2xl text-white">+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Index;