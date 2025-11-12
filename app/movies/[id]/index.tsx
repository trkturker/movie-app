// rnfe

import { Button } from '@/components/Button';
import { useDeleteMovie } from '@/hooks/useDeleteMovie';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEditMovie } from '@/hooks/useEditMovie';
import { useMovie } from '@/hooks/useMovie';
import { useLocalSearchParams } from 'expo-router';

const Index = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: movie } = useMovie(id);


    const { mutate: editMovie } = useEditMovie();
    const { mutate: deleteMovie } = useDeleteMovie();

    const handleEdit = (id: string) => {
        router.navigate(`/movies/${id}/edit`);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Filmi Sil',
            'Bu filmi silmek istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                },
                {
                    text: 'Evet, Sil',
                    style: 'destructive',
                    onPress: () => {
                        deleteMovie(id);
                        router.back();
                    },
                },
            ],
            { cancelable: true }
        );
    };



    return (
        <SafeAreaView className="gap-4 px-6 bg-purple-50 h-screen">
            <Image source={{ uri: movie?.image }} style={{ height: 250, width: "100%", borderRadius: 20 }} />


            <Text className="text-xl font-bold text-purple-800">
                {movie?.name}
            </Text>

            <View className='gap-4'>

                <Text className="text-base font-semibold text-purple-500">
                    Tür: <Text className="text-base font-normal  text-purple-500">{movie?.type}</Text>
                </Text>
                <Text className="text-base font-semibold text-purple-500">
                    Süre:  <Text className="text-base font-normal text-purple-500">{movie?.playtime}</Text>
                </Text>
                <Text className="text-base font-semibold text-purple-500">
                    Puan:  <Text className="text-base font-normal text-purple-500">{movie?.rating}</Text>
                </Text>
                <Text className="text-base font-semibold text-purple-500">
                    Açıklama:  <Text className="text-base font-normal text-purple-500">{movie?.description}</Text>
                </Text>
            </View>

            <View className='flex-row gap-4 pt-6'>

                <Button title="Filmi düzenle" className='bg-[#7c3aed] flex-1' onPress={() => handleEdit(id)} />
                <Button title="Filmi sil" className='bg-[#7c3aed] flex-1' onPress={() => handleDelete(id)} />
            </View>
        </SafeAreaView>
    );
};

export default Index;