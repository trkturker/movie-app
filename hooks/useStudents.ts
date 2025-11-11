import { db } from '@/services/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export type Student = {
    id: string;
    name: string;
    surname: string;
    image: string;
};

export const useStudents = () => {
    return useQuery<Student[]>({
        queryKey: ['students'],
        queryFn: async () => {
            // collection bize o kaydın referansını verir   
            // Collection 68.sayfada diyor mesela (kitap örneği)
            // get docs'tan çekebilmek için referans noktası lazım collection'da onu veriyor 
            const studentsRef = collection(db, 'students');
            // getDocs kısmında web isteği gerçekleşiyor
            const snapshot = await getDocs(studentsRef);
            // Artık istek gerçekleşti ve snapshot'a yazıldı.
            // Artık bu snapshot objesinden verileri Student[] olarak dönüştürebiliriz
            const students = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return students as Student[];
        },
    });
};