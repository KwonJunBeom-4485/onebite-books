// DynamicPrice 로딩 중 표시될 스켈레톤
// ProductionPage에서 Suspense fallback 에서 사용할 예정
export default function PriceSkeleton() {
    return(
        <div className="space-y-2 animate-pulse">
            {/* 가격 자리 : text-3xl font-bold ~ h-9 */}
            <div className="h-9 w-36 bg-gray-200 ronded" />
            {/* 재고 자리 : text-sm ~ h-4 */}
            <div className="h-4 w-24 bg-gray-200 rouned" />
        </div>
    )
}