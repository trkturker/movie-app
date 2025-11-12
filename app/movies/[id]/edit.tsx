// rnfe

import { Button } from '@/components/Button';
import { useAddMovie } from '@/hooks/useAddMovie';
import { useEditMovie } from '@/hooks/useEditMovie';
import { storage } from '@/services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Movies } from '@/hooks/useMovies';
import { useMovie } from '@/hooks/useMovie';

const Add = ({ item }: { item: Movies }) => {

    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: movie } = useMovie(id);
    // usss

    const [name, setName] = useState(movie?.name || '');

    const [type, setType] = useState(movie?.type || '');
    const [playtime, setPlaytime] = useState(movie?.playtime || '');
    const [rating, setRating] = useState(movie?.rating || '');
    const [image, setImage] = useState(movie?.image || '');
    const [description, setDescription] = useState(movie?.description || '');

    const { mutate: editMovie } = useEditMovie();

    const handleEdit = () => {

        editMovie({
            id: id, 
            name,
            type,
            playtime,
            rating,
            image,
            description
        });
        router.back();
    };



    return (
        <SafeAreaView className="gap-4 p-4 bg-purple-50 h-screen">
            <View className="gap-1">
                <Text className="text-purple-800 font-medium">Film Adı</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white"
                    placeholder="Film adı giriniz"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View className="gap-1">
                <Text className="text-purple-800 font-medium">Film Türü</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white"
                    placeholder="Örn: Aksiyon, Dram, Komedi"
                    value={type}
                    onChangeText={setType}
                />
            </View>

            <View className="gap-1">
                <Text className="text-purple-800 font-medium">IMDB Puanı</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white"
                    placeholder="1-10 arası puan giriniz"
                    value={rating}
                    onChangeText={setRating}
                />
            </View>
            <View className="gap-1">
                <Text className="text-purple-800 font-medium">Film Süresi</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white"
                    placeholder="Filmin süresini giriniz"
                    value={playtime}
                    onChangeText={setPlaytime}
                />
            </View>

            <View className="gap-1">
                <Text className="text-purple-800 font-medium">Film Posteri URL</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white"
                    placeholder="https://example.com/poster.jpg"
                    value={image}
                    onChangeText={setImage}
                />

            </View>

            <View className="gap-1">
                <Text className="text-purple-800 font-medium">Film Açıklaması</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white h-32"
                    placeholder="Film konusunu kısaca anlatın"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                />
            </View>

            <Button title="Filmi düzenle" className='bg-[#7c3aed]' onPress={handleEdit} />
        </SafeAreaView>
    );
};

export default Add;