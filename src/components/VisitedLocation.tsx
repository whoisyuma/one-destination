'use client'

import { deleteLocation } from "@/actions/locations"
import { updateLocationVisited } from "@/actions/updateLocationVisited"
import { useTransition } from "react"

type Location = {
    id: string
    name: string
    visited: boolean
    createdAt: Date
}

type Props = {
    groupId: string
    locations: Location[]
}

export default function VisitedLocation({ groupId, locations }: Props) {
    const [isPending, startTransition] = useTransition();

    // チェックボックスでvisited, unvisitedの切り替え
    const handleToggle = (locationId: string, currentVisited: boolean) => {
        startTransition(() => {
            updateLocationVisited({groupId, locationId, visited: !currentVisited})
        })
    }

    // 削除ボタンで削除
        const handleDelete = (id: string) => {
        const ok = confirm('本当に削除しますか？')
        if (!ok) return
        
        startTransition(() => {
            deleteLocation({ groupId, locationId: id })
        })
    }

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }

    return (
        <div className="mb-5 bg-gray-50 rounded-md p-2">
            <h2 className="text-xl font-bold mb-8">行った場所</h2>
            
            {locations.length === 0 ? (
                <p className="text-gray-500 text-sm mb-5 ml-2">行った場所はまだありません。</p>
            ) : (
                <ul>
                    {locations.map((location) => (
                        <li key={location.id} className="mb-5 border-b border-gray-400 pb-3">
                            <div className="flex items-center">
                                <input type="checkbox" checked={location.visited} onChange={() => handleToggle(location.id, location.visited)} className="w-3.5 h-3.5"/>
                                <span className="font-medium ml-1">
                                    {location.name}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500 mt-0.5 ml-4">追加日：{formatDate(location.createdAt)}</p>
                                <button onClick={() => handleDelete(location.id)}>
                                    <img src="/delete-icon.svg" alt="削除ボタン" className="w-5 h-5"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}