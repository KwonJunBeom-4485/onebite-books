"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // 검색창에 입력한 q에 넘길 값 처리
    const [query, setQuery] = useState(searchParams.get('q') ?? '');

    // submitHandler
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = query.trim();
        if(trimmed) {  // 검색어가 있는 경우
            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        }else {   // 검색어가 없는 경우
            router.push('/search');
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <input placeholder="도서 제목 또는 저자를 입력하세요"
                type="text" value={query} onChange={(e) => setQuery(e.target.value)} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >검색</button>
        </form>
    )
    
}