import { db } from '@/services/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export type Movie = {
    id: string;
    name: string;
    playtime: string;
    image: string;
    rating: string;
    type: string;
    description: string;
};

export const useMovie = (id: string) => {
    return useQuery<Movie>({
        queryKey: ['movies', id],
        queryFn: async () => {
            // collection bize o kaydın referansını verir   
            // Collection 68.sayfada diyor mesela (kitap örneği)
            // get docs'tan çekebilmek için referans noktası lazım collection'da onu veriyor 
            const movieRef = doc(db, "movies", id);
            // 2. snapshot getirilir
            const snapshot = await getDoc(movieRef);
            const movie = {
                id: snapshot.id,
                ...snapshot.data(),
            } as Movie;
            return movie;
        },
    });
};