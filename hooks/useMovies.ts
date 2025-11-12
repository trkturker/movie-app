import { db } from '@/services/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export type Movies = {
    id: string;
    name: string;
    image: string;
    rating: string;
    type: string;
    description: string;
};

export const useMovies = () => {
    return useQuery<Movies[]>({
        queryKey: ['movies'],
        queryFn: async () => {
            // collection bize o kaydın referansını verir   
            // Collection 68.sayfada diyor mesela (kitap örneği)
            // get docs'tan çekebilmek için referans noktası lazım collection'da onu veriyor 
            const moviesRef = collection(db, 'movies');
            // getDocs kısmında web isteği gerçekleşiyor
            const snapshot = await getDocs(moviesRef);
            // Artık istek gerçekleşti ve snapshot'a yazıldı.
            // Artık bu snapshot objesinden verileri Student[] olarak dönüştürebiliriz
            const movies = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return movies as Movies[];
        },
    });
};