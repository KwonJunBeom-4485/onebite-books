// "/search" 검색 페이지 전용 로딩 중 표시

import { SearchSkeleton } from "@/components/skeleton/search-skeleton";

export default function SearchLoading() {
    return(
        // <div className="flex items-center justify-center py-20">
        //     <p className="text-gray-500 italic animate-bounce">
        //         📚 도서 정보를 찾는 중입니다...
        //     </p>
        // </div>
        <SearchSkeleton />
    )
}