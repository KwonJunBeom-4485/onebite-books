/*
  도서에 대한 목록 정보를 읽어와야 합니다. (API 없어서 Mock Data 사용)
  실제로는 Mock Data 부분을 API를 이용한 fetch 서비스로 변경해야 함.
*/

import BookCover from "@/components/book-cover";
import SearchBar from "@/components/search-bar";
import Link from "next/link";
import { Suspense } from "react";

const MOCK_BOOKS = [
  {
    id: 1,
    title: '한 입 크기로 잘라먹는 동료들',
    author: '빅맘',
    // 실제 커버 이미지가 없어서 picsum.photos 사이트에서 더미 이미지를 사용
    // 이 이미지를 사용하려면, next.config.ts에 remotePattern 등록이 필요.
    // seed 값이 같으면 항상 같은 이미지를 반환
    cover: 'https://picsum.photos/seed/book1/400/600'
  },
  {
    id: 2,
    title: '한 입 크기로 잘라먹는 케이크',
    author: '푸리나',
    cover: 'https://picsum.photos/seed/book2/400/600'
  },
  {
    id: 3,
    title: '모장 마인크래프트(JAVA)',
    author: '사모장',
    cover: 'https://picsum.photos/seed/book3/400/600'
  },
  {
    id: 4,
    title: 'You Don\'t Know JS',
    author: 'Kyle simpson',
    cover: 'https://picsum.photos/seed/book4/400/600'
  },
  {
    id: 5,
    title: 'Clean Game',
    author: 'Rapstar',
    cover: 'https://picsum.photos/seed/book5/400/600'
  }
]

// ─────────────────────────────────────────────────────────
// 실제 API 연동 시 교체할 fetch 함수
// ─────────────────────────────────────────────────────────
async function getAllBooks() {
  // TODO: 실제 API 연동 시 아래 주석 해제
  // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
  // const res = await fetch(`${baseUrl}/books`, {
  //   // next.revalidate: ISR — 60초마다 재검증
  //   // 홈 페이지는 자주 바뀌지 않으므로 캐싱 활용
  //   next: { revalidate: 60 },
  // });
  // if (!res.ok) throw new Error('도서 목록을 불러오지 못했습니다.');
  // return res.json();
  return MOCK_BOOKS;
}

export default async function Home() {

  // 위에 생성한 비동기 함수를 이용해 도서 정보 읽어오기
  const books = await getAllBooks();

  // 히어로 이미지 : 첫번째 책을 화면 상단에 크게 표시
  // isHero = true 인 경우, priority props 활성 -> LCP 점수 개선
  const [heroBook, ...restBooks] = books;


  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 검색창 */}
        {/* 검색창은 use-client를 사용한 컴포넌트 - useState, useRouter */}
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>

        {/* 히어로 섹션 */}
        {heroBook && (
          <section className="mb-10">
            <h2>이달의 추천 도서</h2>
            <Link href={`/book/${heroBook.id}`}
              className="flex gap-6 p-6 border rounded-2xl hover:shadow-lg transition"
            >
              {/* ishero가 true인 경우, priority + blur placeholder 적용 */}
              {/* 화면에 처음 보이는 이미지이므로, preload 필수 */}
              <div className="w-32 flex-shrink-0">
                {/* 이미지 처리 : BookCover */}
                <BookCover src={heroBook.cover} alt={heroBook.title} isHero={true} />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p className="text-xl font-bold">{heroBook.title}</p>
                <p className="text-gray-500">{heroBook.author}</p>
                <span className="text-sm text-blue-500 mt-2">
                  자세히 보기 &rarr;
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* 전체 도서 그리드 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-500 mb-4">전체 도서 목록</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {restBooks.map((book) => (
              <li key={book.id}>
                <Link
                  href={`/book/${book.id}`}
                  className="block group"
                >
                  <BookCover src={book.cover} alt={book.title} />
                  <p className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-blue-500 transition">{book.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{book.author}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
    </main>
  );
}
