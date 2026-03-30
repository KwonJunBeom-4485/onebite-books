import PriceSkeleton from '@/components/price-skeleton';

export default function ProductLoading() {
  return (
    <div className='p-10 flex flex-col gap-8'>
      {/* 상품 정보 스켈레톤 */}
      {/* animate-pulse: 부모에 선언하면 자식 div 전체에 애니메이션 적용 */}
      <div className='flex gap-8 animate-pulse'>
        <div className='w-48 aspect-[2/3] bg-gray-200 rounded-lg flex-shrink-0' />
        <div className='flex flex-col gap-3 flex-1'>
          <div className='h-9 bg-gray-200 rounded w-3/4' />
          <div className='h-4 bg-gray-200 rounded w-1/4' />
          <div className='h-4 bg-gray-200 rounded w-full mt-2' />
          <div className='h-4 bg-gray-200 rounded w-5/6' />
        </div>
      </div>
      {/* 가격 스켈레톤: 별도 섹션이므로 animate-pulse를 독립적으로 선언 */}
      <div className='p-6 bg-gray-50 rounded-xl border'>
        {/* ★ 이 div는 위 상품 정보 섹션과 별개 → animate-pulse 별도 필요 */}
        <div className='h-4 bg-gray-200 rounded w-32 mb-3 animate-pulse' />
        <PriceSkeleton />
      </div>
    </div>
  );
}
