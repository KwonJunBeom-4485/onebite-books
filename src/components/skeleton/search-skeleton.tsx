// SearchSkeleton은 2곳에서 사용됩니다!!
// SearchPage의 <Suspense fallback>과 search/loading.tsx
// loading.tsx을 사용하는 경우, 경로 이동시 동작(trigger), /search페이지 전체 로딩 중 표시
// Suspense을 사용하는 경우, searchParams(q)가 변경될 때 동작(trigger), 검색이 바뀔 때마다 재표시

// 검색 헤더 스켈레톤
// SearchPage 상단에 제목(h1)과 '전체 목록 보기' 링크
// export를 사용하지 않으면, 외부에서 해당 컴포넌트를 직접 불러 사용 안됨
function SearchHeaderSkeleton() {
    return(
        <div className="mb-8 animate-pulse">
            {/* h1 제목 자리 : text-2xl font-bold ~ h-8, w-1/3 */}
            <div className="h-8 bg-gray-200 rounded w-1/3" />
        </div>
    );
}

// 검색 결과 그리드 스켈레톤 
// SearchResults가 랜더링하는 카드 그리드와 동일한 레이아웃
function SearchGridSkeleton() {
    return(
        // 실제 SearchResults의 그리드 : grid grid-cols-1 gap-4 sm:grid-cols-2 ... 
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* 4개 카드 : 실제 Mock 데이터 5건을 고려해서 비슷한 수로 맞춤 */}
            {Array.from({length: 4}).map((_, i) => (
                <li key={i} className="p-4 border rounded-xl animate-pulse">
                    {/* 제목 자리 : font-bold text-gray-900 ~ h-5, w-3/4 */}
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    {/* 저자 자리 : text-sm text-gray-500 ~ h-4, w-1/4*/}
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                    {/* 설명 2줄 : text-sm text-gray-600 ~ h-3 */}
                    <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-4/5 " />
                </li>
            ))}
        </ul>
    );
}

// 외부에서 import해서 쓰는 메인 컴포넌트
export function SearchSkeleton() {
    return(
        <div>
            <SearchHeaderSkeleton />
            <SearchGridSkeleton />
        </div>
    );
}