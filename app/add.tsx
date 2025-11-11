// rnfe

import { Button } from '@/components/Button';
import { useAddStudent } from '@/hooks/useAddStudent';
import { storage } from '@/services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const Add = () => {
    // usss
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [image, setImage] = useState('');

    const { mutate: addStudent } = useAddStudent();

    const handleAdd = () => {
        addStudent({ name, surname, image });
        router.back();
    };

    const handlePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.75,
        });

        if (!result.assets) {
            alert('Henüz bir resim seçmediniz');
            return;
        }

        // 1. Dosya yolunu verir
        // file:///Zafer/Downloads/Simulator/asdasd.jpg
        const imagePath = result.assets[0].uri;
        // 2. byte object oluşturucaz (blob)
        const response = await fetch(imagePath);
        const blob = await response.blob();
        // 3. Firebase için dosya storageRef oluşturucaz
        const filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
        const storageRef = ref(storage, filename);
        // 4. byte dosyası karşıya atılır
        await uploadBytes(storageRef, blob);
        // 5. Dosya URL alınır ve state'e set edilir
        const downloadUrl = await getDownloadURL(storageRef);
        setImage(downloadUrl);
        alert('Yükleme başarılı');
    };

    const handleCamera = async () => {
        // 1. Kamera izni al
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        // Izin verilmediyse alert göster
        if (status !== 'granted') {
            alert('Kamera izni gerekli');
            return;
        }

        // 2. Kamera aç
        const result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.75,
        });

        if (result.canceled) {
            alert('Iptal ettiniz');
            return;
        }

        const imagePath = result.assets[0].uri;
        // 1. Blob oluştur
        const response = await fetch(imagePath);
        const blob = await response.blob();
        // 2. Firebase için referans oluştur
        const filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
        const storageRef = ref(storage, filename);
        // 3. Firebase'e yükle
        await uploadBytes(storageRef, blob);
        // 4. Dosya URL al ve state'e set et
        const downloadUrl = await getDownloadURL(storageRef);
        setImage(downloadUrl);
        alert('Yükleme başarılı.');
    };

    return (
        <View className="gap-4">
            <TextInput
                className="border p-4"
                placeholder="Isim giriniz"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                className="border p-4"
                placeholder="Soyisim giriniz"
                value={surname}
                onChangeText={setSurname}
            />
            <View className="flex-row gap-4">
                <Button title="Resim seç" onPress={handlePick} />
                <Button title="Resim çek" onPress={handleCamera} />
            </View>
            <Button title="Ogrenci ekle" onPress={handleAdd} />
        </View>
    );
};

export default Add;