// animate-pulse : tailwinddml 반짝이는 로딩 애니메이션
// skeleton 처리를 위해서 bg-gray-200 회색 블록으로 실제 콘텐츠 자를 예약...
// ----------------------
//  중요 포인트 : 스켈레톤의 레이아웃은 실제 BookDetailPage와 동일해야 함.
//  실제 페이지가 flex-row라면 스켈레톤도 같은 flex-row로 구성해야 합니다. 
//  너비와 높이가 다르면 콘텐츠 로드 후 CLS(레이아웃 이동)가 발생합니다. 
// ----------------------
export default function BookDetailSkeleton(){
    // 실제 BookDetailPage와 동일한  flex방향(md:flex-row) 사용
    return(
        <div className="animate-pulse flex flex-col md:flex-row gap-8 p-8 border rounded-xl">
            {/* 표지 이미지 자리 : 실제 BookCover의 w-full md:w-64 aspect-[2/3]와 일치 */}
            <div className="w-full md:w-64 apect-2/3 bg-gray-200 rounded-lg shrink-0" />

            <div className="flex flex-col gap-3 flex-1">
                {/* 제목 자리 : 실제 h1 택스트의 높이 (text-3xl h-8)와 일치 */}
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                {/* 저자 자리 */}
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                {/* 설명 자리 (description) */}
                <div className="h-4 bg-gray-200 rounded w-full mt-4" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
        </div>
    );
}

// ReviewListSkeleton: ReviewList 컴포넌트와 1:1로 대응되는 스켈레톤
// Mock 데이터를 사용해서 ReviewList를 출력. 카드 3개 랜더링 하게 만들어줌.
// 스켈레톤 3개의 카드를 보여주게 함. 
export function ReviewListSkeleton() {
    return(
        <div className="flex flex-col gap-4">
        {/* 실제 리뷰 카드 3개와 동일한 h-20 높이 */}
        {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse p-4">
                {/* 작성자 이름 자리  */}
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                {/* 리뷰 내용 자리 */}
                <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
        ))}
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// RelatedSkeleton: RelatedBooks 컴포넌트와 1:1로 대응
// RelatedBooks가 가로 스크롤 4개 카드를 렌더링하므로
// 스켈레톤도 동일한 4개 카드 구조를 사용합니다.
// ─────────────────────────────────────────────────────────
export function RelatedSkeleton() {
  return (
    <div className='flex gap-4 overflow-x-hidden'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='shrink-0 w-32 animate-pulse'>
          {/* 표지 자리: aspect-[2/3] = w-32 기준 h-48 */}
          <div className='w-32 h-48 bg-gray-200 rounded-lg mb-2' />
          {/* 제목 자리 */}
          <div className='h-3 bg-gray-200 rounded w-full mb-1' />
          <div className='h-3 bg-gray-200 rounded w-2/3' />
        </div>
      ))}
    </div>
  );
}

