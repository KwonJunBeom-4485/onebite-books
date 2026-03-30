// 학습용으로 실제 API 없이 2초 지연으로 느림 서버 시뮬레이션...
// 실제로 서비스할 경우에는 fetch로 교체해서 작업

// 학습용 리뷰 데이터 생성
// 첫번째 string은 도서id에 {}는 리뷰 객체
const MOCK_REVIEWS: 
    Record<string, {id: number; author: string; content: string; rating: number}[]> = {
    '1': [
        {id: 1, author: '김독자', content:'입문서로는 최곱니다! 예제가 실용적이에요.', rating: 5},
        {id: 2, author: '박개발', content:'실무에서 바로 적용했어요. 강력추천!', rating: 5},
        {id: 3, author: '이학생', content:'처음 React를 배우는데 많은 도움이 되었습니다.', rating: 4},
    ],
    '2': [
        {id: 1, author: '최타입', content:'Typestript 입문에 딱 맞는 책이예요.', rating: 4},
        {id: 2, author: '정프론트', content:'타입 시스템이 이해되기 시작했어요!!', rating: 5},

    ],
    '3': [],
    '4': [],
};

// 비동키 컴포넌트이고, await가 있다면, Next.js는 이 컴포넌트 Suspense 경계로 분리합니다. 
export default async function ReviewList({bookId}:{bookId: string}) {
    // 실제는 여기가 API 연동 작업이 있는 곳!!!
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${bookId}/reviews`);
    // const reviews = await res.json();

    // 2초 지연 처리 : 느린 API를 시뮬레이션 하기 위해서 (Devtool -> Network 탭에서 확인 가능)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const reviews = MOCK_REVIEWS[bookId] ?? [];

    // 리뷰가 없는 경우, 
    if (reviews.length === 0) {
        return(
            <p className="text-gray-400 text-center py-8">
                아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨보세요. 
            </p>
        );
    }

    // 에러 발생시 Suspense의 동작 확인을 위해서 작성한 코드
    // 테스트 후에 반드시 주석 또는 삭제하세요.... 
    // throw new Error('테스트 에러');

    // 리뷰가 있는 경우, 
    return(
        <div className="space-y-3">
            {reviews.map((r) => (
                <div key={r.id} className="p-4 border rounded-xl bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-sm">{r.author}</p>
                        {/* 별점 표시 */}
                        <span className="text-yellow-400 text-sm">
                            {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{r.content}</p>
                </div>
            ))}
        </div>
    )
}


