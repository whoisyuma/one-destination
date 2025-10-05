'use client'

import { addLocation } from "@/actions/locations";
import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type FormProps = {
    groupId: string;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="bg-emerald-500 text-white rounded-md px-3 py-1 disabled:opacity-50">
            {pending ? '追加中...' : '追加'}
        </button>
    )
}

export default function AddLocationForm({ groupId }: FormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const locationName = formData.get('locationName') as string;

        const result = await addLocation({groupId, locationName});

        if (!result.success) {
            setError(result.error ?? 'エラーが発生しました。')
            return;
        }

        if (formRef.current) {
            formRef.current.reset();
        }
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef} className="mb-15">
            {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
            <input type="text" name="locationName" placeholder="行きたい場所を追加" className="border-2 rounded-md bg-white border-gray-400 shadow-sm p-1 mr-1 w-2/3"/>
            <input type="hidden" name="groupId" value={groupId}/>
            <SubmitButton/>
        </form>
    )
}