import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Movies } from "./useMovies";
import { addDoc, collection, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export const useDeleteMovie = () => {
    // 1. Ekleme sonrası cache temizlememiz lazım     
    // Bu nedenle mevcut queryClient'ı çekmemiz gerekiyor
    const queryClient = useQueryClient();

    // 2. Ekleme/Çıkarma/Düzenleme gibi bir değişiklik yapcağımız için mutation kullanıyoruz

    return useMutation({
        // student without id gibi, id'yi ilgili tipten çıkarıp verir
        mutationFn: async (movie: Omit<Movies, "id">) => {
            // 3. Tablonun referansı için studentRef alıcaz ve addDoc işlemini yapacağız
            const movieRef = collection(db, 'movies');
            await deleteDoc(movieRef, movie);
        },
        onSuccess: () => {
            // 4. Tekrar data çekilsin diye cache temizlenir
            queryClient.invalidateQueries({queryKey: ['movies']});
        },
    })

};
