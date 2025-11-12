import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Movies } from "./useMovies";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export const useEditMovie = () => {
    // 1. Ekleme sonrası cache temizlememiz lazım     
    // Bu nedenle mevcut queryClient'ı çekmemiz gerekiyor
    const queryClient = useQueryClient();

    // 2. Ekleme/Çıkarma/Düzenleme gibi bir değişiklik yapcağımız için mutation kullanıyoruz

    return useMutation({
        // student without id gibi, id'yi ilgili tipten çıkarıp verir
        mutationFn: async (movie: Movies) => {
            const movieRef = doc(db, 'movies', movie.id);
            await updateDoc(movieRef, movie);
        },
        onSuccess: (_data, movie) => {
            // 4. Tekrar data çekilsin diye cache temizlenir
            queryClient.invalidateQueries({ queryKey: ['movies', movie.id] });
            queryClient.invalidateQueries({ queryKey: ["movies"]});

        },
    })

};
