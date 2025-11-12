import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Movies } from "./useMovies";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export const useDeleteMovie = () => {
    // 1. Ekleme sonrası cache temizlememiz lazım     
    // Bu nedenle mevcut queryClient'ı çekmemiz gerekiyor
    const queryClient = useQueryClient();

    // 2. Ekleme/Çıkarma/Düzenleme gibi bir değişiklik yapcağımız için mutation kullanıyoruz

    return useMutation({
        // student without id gibi, id'yi ilgili tipten çıkarıp verir
        mutationFn: async (id: string) => {
            // 3. Tablonun referansı için studentRef alıcaz ve addDoc işlemini yapacağız
            const movieRef = doc(db, 'movies', id);
            await deleteDoc(movieRef);   
        },
        onSuccess: () => {
            // 4. Tekrar data çekilsin diye cache temizlenir
            queryClient.invalidateQueries({queryKey: ['movies']});
        },
    })

};
