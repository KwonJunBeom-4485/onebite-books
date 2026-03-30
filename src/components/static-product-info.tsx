import BookCover from '@/components/book-cover';
// notFound(): 상품 없을 때 Next.js 404 페이지로 이동
import { notFound } from 'next/navigation';

// 학습용 Mock 상품 데이터
const MOCK_PRODUCTS = {
  '1': {
    id: '1',
    name: '한 입 크기로 잘라먹는 리액트',
    author: '이정환',
    description: 'React 기초부터 심화까지, 한 입 크기 예제로 배우는 완전 정복 가이드.',
    imageUrl: 'https://picsum.photos/seed/book1/400/600',
  },
  '2': {
    id: '2',
    name: '한 입 크기로 잘라먹는 타입스크립트',
    author: '이정환',
    description: 'TypeScript를 실전 예제로 쉽게 배우는 입문서.',
    imageUrl: 'https://picsum.photos/seed/book2/400/600',
  },
  '3': {
    id: '3',
    name: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    description: '자바스크립트의 핵심 개념을 깊이 있게 다루는 바이블.',
    imageUrl: 'https://picsum.photos/seed/book3/400/600',
  },
} as const;

// ─────────────────────────────────────────────────────────
// 실제 API 연동 시 이 함수만 교체합니다.
// ISR 사용 시 cache 설정에 따라 정적 셸에 포함됩니다.
// ─────────────────────────────────────────────────────────
async function getProduct(id: string) {
  // TODO: 실제 API 연동 시 아래 주석 해제
  // ★ 원본 문제: res.ok 체크 없이 res.json().catch() 사용
  //   → 4xx/5xx 응답에서 catch로 빠져 fallback 데이터가 표시됨
  //   → 실제 서버 에러를 숨기는 부작용
  // 올바른 패턴:
  // const res = await fetch(`https://your-api.com/products/${id}`, {
  //   next: { revalidate: 3600 },  // ISR: 1시간마다 재검증
  // });
  // if (!res.ok) return null;      // null 반환 → 호출부에서 notFound() 처리
  // return res.json();

  return MOCK_PRODUCTS[id as keyof typeof MOCK_PRODUCTS] ?? null;
}

export default async function StaticProductInfo({ id }: { id: string }) {
  const product = await getProduct(id);

  // ★ return notFound(): TypeScript가 이후 코드에서 product가 non-null임을 추론
  // if (!product) notFound() 만 쓰면 'product is possibly null' 에러 발생
  if (!product) return notFound();

  return (
    <div className='flex gap-8'>
      {/* ★ 원본 문제: <div> 회색 박스 → BookCover 컴포넌트로 교체 */}
      {/* BookCover: next/image + aspect-ratio CLS 방지 + blur placeholder */}
      <div className='w-48 flex-shrink-0'>
        <BookCover
          src={product.imageUrl}
          alt={product.name}
          isHero={true}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{product.name}</h1>
        <p className='text-gray-500'>저자: {product.author}</p>
        <p className='text-gray-600 mt-2 leading-relaxed'>{product.description}</p>
      </div>
    </div>
  );
}
