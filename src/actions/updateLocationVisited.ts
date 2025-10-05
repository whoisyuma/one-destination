'use server'

import { db } from "@/firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import { revalidatePath } from "next/cache"

type Params = {
    groupId: string
    locationId: string
    visited: boolean
}

export async function updateLocationVisited({ groupId, locationId, visited }: Params) {
    try {
        const locationRef = doc(db, 'groups', groupId, 'locations', locationId)
        await updateDoc(locationRef, { visited })

        revalidatePath(`/${groupId}/home`)
        return { success: true }
    } catch (e) {
        console.error('予期せぬエラー：', e);
        return { error: 'データの更新中に予期せぬエラーが発生しました。'};
    }
}