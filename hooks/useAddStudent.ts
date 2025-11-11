import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Student } from "./useStudents";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export const useAddStudent = () => {
    // 1. Ekleme sonrası cache temizlememiz lazım     
    // Bu nedenle mevcut queryClient'ı çekmemiz gerekiyor
    const queryClient = useQueryClient();

    // 2. Ekleme/Çıkarma/Düzenleme gibi bir değişiklik yapcağımız için mutation kullanıyoruz

    return useMutation({
        // student without id gibi, id'yi ilgili tipten çıkarıp verir
        mutationFn: async (student: Omit<Student, "id">) => {
            // 3. Tablonun referansı için studentRef alıcaz ve addDoc işlemini yapacağız
            const studentRef = collection(db, 'students');
            await addDoc(studentRef, student);
        },
        onSuccess: () => {
            // 4. Tekrar data çekilsin diye cache temizlenir
            queryClient.invalidateQueries({queryKey: ['students']});
        },
    })

};
