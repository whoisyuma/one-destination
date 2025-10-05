'use server'

import { v4 as uuidv4 } from 'uuid';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config'

export async function createGroup(formData: FormData) {
    // グループ名の取得
    const groupName = formData.get('groupName') as string;
    
    // メンバー名の取得とバリデーション
    const memberNames = (formData.getAll('memberName') as string[]).filter(name => name.trim() !== '');

    if (memberNames.length === 0) {
        return { error: 'メンバーを追加してください。'}
    }

    try {
        const groupId = uuidv4();
        // URLに使うIDとgroupsのドキュメントIDを一致させる
        const groupRef = doc(db, 'groups', groupId);
        await setDoc(groupRef, {
            id: groupId,
            name: groupName,
            createdAt: serverTimestamp(),
            members: memberNames,
        });

        return { success: true, groupId };
    } catch (e) {
        console.error('予期せぬエラー：', e);
        return { error: 'グループの作成中に予期せぬエラーが発生しました。'};
    }
}