'use server'

import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";

type LocationParams = {
    groupId: string;
    locationName: string;
}

// 行きたい場所を追加する
export async function addLocation({ groupId, locationName }: LocationParams) {
    if (!locationName || locationName.trim() === '') {
        return { success: false, error: '行きたい場所を入力してください。'};
    }

    try {
        const groupRef = doc(db, 'groups', groupId);
        const locationRef = collection(groupRef, 'locations');
        await addDoc(locationRef, {
            name: locationName,
            createdAt: serverTimestamp(),
            visited: false,
        })

        revalidatePath(`/${groupId}/home`);

        return { success: true };
    } catch (e) {
        console.error('予期せぬエラー：', e);
        return { error: '行きたい場所の追加中に予期せぬエラーが発生しました。'};
    }
}

type IdParams = {
    groupId: string
    locationId: string
}

// 行きたい場所を削除する
export async function deleteLocation({ groupId, locationId }: IdParams) {
    try {
        const locationRef = doc(db, 'groups', groupId, 'locations', locationId)
        await deleteDoc(locationRef)

        revalidatePath(`/${groupId}/home`);

        return { success: true };
    } catch (e) {
        console.error('予期せぬエラー：', e);
        return { error: '行きたい場所の削除中に予期せぬエラーが発生しました。'};

    }
}