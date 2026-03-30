import BookDetailSkeleton from "@/components/skeleton/book-detail-skeleton";

// /book/[id]/ 접근 시 트리거 되는 loading.tsx
export default function BookDetailLoading() {

    return(
        <div className="max-w-2xl mx-auto p-8">
            {/* BookDetailSkeleton : book/[id]/page.tsx 레이아웃과 동일한 구조 */}
            <BookDetailSkeleton />
        </div>
    );    
}