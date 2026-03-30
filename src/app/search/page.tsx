import SearchResults from "@/components/search-results";
import { SearchSkeleton } from "@/components/skeleton/search-skeleton";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

// const MOCK_ALL_BOOKS = [
//   { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환', description: 'React 완전 정복 가이드.' },
//   { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환', description: 'TypeScript 입문서.' },
//   { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모', description: 'JS 핵심 개념 정복.' },
//   { id: 4, title: 'You Don\'t Know JS', author: 'Kyle Simpson', description: 'JS 심화 시리즈.' },
//   { id: 5, title: 'Clean Code', author: 'Robert C. Martin', description: '클린 코드 원칙.' },
// ];

// 실제 API 연동시 작업할 함수인 "검색 함수"
// 옵셔널 체이닝 => 중첩된 객체 속성이 있는 확인에 조건분기 
// q?:string -> q가 있으면 string 타입. 없으면 null 허용!
// async function searchBooks(q?: string) {
//     // 실제 API 연동시 작업

//     // 학습용 MOCK_ALL_BOOKS을 사용.
//     // !q 의미는? q가 존재하면-> false, q가 없으면 -> true
//     if (!q) return MOCK_ALL_BOOKS;
//     // q가 있는 경우에는 q로 필터링 결과 반환
//     const lower = q.toLocaleLowerCase();
//     return MOCK_ALL_BOOKS.filter(
//         (b) => b.title.toLocaleLowerCase().includes(lower) ||
//             b.author.toLocaleLowerCase().includes(lower),
//     );
// }

// 타입 스트립트 (interface 설정과 비슷한 기능) 문법
type Props = { searchParams: Promise<{q?:string}>}

// 검색 결과에 따른 메타 데이터 처리... 
// 검색 결과에 따른 동적 메타데이터 처리
export async function generateMetadata({searchParams}:Props): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `'${q}' 검색 결과` : '도서 검색',
        description: q
        ? `한입 북스에서 '${q}'로 검색한 결과입니다.`
        : '한입 북스의 전체 도서 목록을 검색하세요.'
    };
    
}

export default async function SearchPage({searchParams}:Props) {
    const { q } = await searchParams;
    // const books = await searchBooks(q);

    // searchBooks에 의해서 필터링된 결과는 books에 존재... 
    return(
        <div className="max-w-3xl mx-auto p-8">
            {/* 검색 헤더 */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    {q ? `"${q}" 검색 결과` : '전체 도서 목록'}
                </h1>
                {/* {q && (
                    <Link href='/search'
                        className="text-sm text-blue-500 hover:underline mt-1 block">
                        ← 전체 목록 보기
                        </Link>
                )} */}

                {/* 
                    Suspense을 이용해서 SearchResults 적용!!!
                    key={q} : q가 바뀔 때마다 Suspense가 재마운트 됩니다. 
                    fallback(스켈레톤)이 다시 표시되지 않아요. 
                    key가 있으면 React가 기존 트리를 버리고 새로 랜더링합니다. 
                */}
                <Suspense key={q} fallback={<SearchSkeleton />}>
                    <SearchResults q={q} />
                </Suspense>
            </div>
        </div>
    )


}