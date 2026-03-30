// ─────────────────────────────────────────────────────────
// RelatedBooks: 관련 도서 목록을 가져오는 느린 비동기 컴포넌트
// 3초 지연 → ReviewList(2초)와 함께 병렬 Suspense 효과 체감
// ─────────────────────────────────────────────────────────
import Link from 'next/link';
import BookCover from '@/components/book-cover';

// 학습용 Mock 관련 도서 데이터
const MOCK_RELATED: Record<string, { id: number; title: string; author: string; cover: string }[]> = {
  '1': [
    { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환',
      cover: 'https://picsum.photos/seed/book2/400/600' },
    { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모',
      cover: 'https://picsum.photos/seed/book3/400/600' },
    { id: 4, title: 'You Don\'t Know JS', author: 'Kyle Simpson',
      cover: 'https://picsum.photos/seed/book4/400/600' },
    { id: 5, title: 'Clean Code', author: 'Robert C. Martin',
      cover: 'https://picsum.photos/seed/book5/400/600' },
  ],
  '2': [
    { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환',
      cover: 'https://picsum.photos/seed/book1/400/600' },
    { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모',
      cover: 'https://picsum.photos/seed/book3/400/600' },
  ],
};

// 기본 관련 도서 (id 매핑이 없을 때 fallback)
const DEFAULT_RELATED = MOCK_RELATED['1'];

interface Props {
  bookId: string;
}

export default async function RelatedBooks({ bookId }: Props) {
  // ★ 3초 지연: ReviewList(2초)보다 느려서 병렬 효과를 눈으로 확인 가능
  // 실제 API 연동 시 교체:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${bookId}/related`);
  // if (!res.ok) throw new Error('관련 도서 조회 실패');
  // const books = await res.json();
  await new Promise(r => setTimeout(r, 3000));

  const books = MOCK_RELATED[bookId] ?? DEFAULT_RELATED;

  if (books.length === 0) {
    return <p className='text-gray-400 text-sm'>관련 도서가 없습니다.</p>;
  }

  return (
    // 가로 스크롤 카드 레이아웃
    // RelatedSkeleton과 동일한 flex gap-4 overflow-x-auto 구조
    <div className='flex gap-4 overflow-x-auto pb-2'>
      {books.map(book => (
        <Link
          key={book.id}
          href={`/book/${book.id}`}
          className='flex-shrink-0 w-32 group'
        >
          <BookCover src={book.cover} alt={book.title} />
          <p className='mt-2 text-xs font-medium line-clamp-2
                        group-hover:text-blue-500 transition'>
            {book.title}
          </p>
          <p className='text-xs text-gray-400 mt-1'>{book.author}</p>
        </Link>
      ))}
    </div>
  );
}
