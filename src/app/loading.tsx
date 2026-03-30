// 글로벌 : 모든 페이지 이동 시 풀백(최상위)
// 페이지 로딩의 우선 순위는 가장 가까운 loading.tsx가 우선적으로 보여짐
// 예시: book/[id] 페이지 이동 시, book/[id]/loading.tsx → search/loading.tsx → app/loading.tsx 순으로 보여짐

// loading.tsx가 트리거 되는 시점과 안되는 시점
// 1. 페이지 이동 시: 트리거 됨
// 2. 같은 페이지 내에서 상태 변화 시: 트리거 되지 않음 (예: 검색어 입력 → 검색 결과 업데이트)
// 3. API 요청 시: 트리거 되지 않음 (예: 도서 상세 정보 요청 → 상세 정보 업데이트)

// 글로벌 loading
export default function GlobalLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-3">
                {/* animate-spin : Tailwind CSS 회전 애니메이션 */}
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-400">로딩 중...</p>
            </div>
        </div>
    );
}