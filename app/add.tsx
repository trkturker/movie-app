// rnfe

import { Button } from '@/components/Button';
import { useAddMovie } from '@/hooks/useAddMovie';
import { storage } from '@/services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Add = () => {
    // usss
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [playtime, setPlaytime] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const { mutate: addMovie } = useAddMovie();

    const handleAdd = () => {
        addMovie({ name, type, rating, image, description});
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
                <Text className="text-purple-800 font-medium">Film Süresi</Text>
                <TextInput
                    className="border border-purple-200 p-4 rounded-2xl bg-white"
                    placeholder="Örn: 1s 40dk"
                    value={playtime}
                    onChangeText={setPlaytime}
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
                    className="border border-purple-200 p-4 rounded-2xl bg-white h-32 text-align-top"
                    placeholder="Film konusunu kısaca anlatın"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"

                />
            </View>

            <Button title="Film ekle" className='bg-[#7c3aed]' onPress={handleAdd} />
        </SafeAreaView>
    );
};

export default Add;