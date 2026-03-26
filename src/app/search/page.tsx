import { Metadata } from "next";
import Link from "next/link";

const MOCK_ALL_BOOKS = [
  { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환', description: 'React 완전 정복 가이드.' },
  { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환', description: 'TypeScript 입문서.' },
  { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모', description: 'JS 핵심 개념 정복.' },
  { id: 4, title: 'You Don\'t Know JS', author: 'Kyle Simpson', description: 'JS 심화 시리즈.' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', description: '클린 코드 원칙.' },
];

// 실제 API 연동 시 작업할 함수인 '검색 함수'
// 옵셔널 체이닝 -> 중첩된 객체 속성이 있는 확인에 조건분기 (뭔 말이지)
// q?:string -> q가 있으면 string 타입 이라는 뜻
async function searchBooks(q?:string) {
    // 실제 API 연동 시 작업

    // 학습용 MOCK_ALL_BOOKS를 사용.
    if(!q) return MOCK_ALL_BOOKS;

    // q가 있을 때 필터링해서 반환
    const lower = q.toLocaleLowerCase();
    return MOCK_ALL_BOOKS.filter(
        (b) => b.title.toLocaleLowerCase().includes(lower) || 
        b.author.toLocaleLowerCase().includes(lower)
    );
}

// 타입 스크립트 (interface 설정과 비슷한 기능) 문법
type Props = { searchParams: Promise<{q?:string}> }

// 검색 결과에 따른 메타 데이터 처리...
// 검색 결과에 따른 동적 메타 데이터 처리
export async function generateMetadata({searchParams}:Props): Promise<Metadata> {

    const { q } = await searchParams;

    return {
        title: q ? `'${q}' 검색 결과` : '도서 검색',
        description: q
        ? `한 입 북스에서 '${q}'로 검색한 결과입니다.`
        : '한 입 북스에서 전체 도서 목록을 검색하세요.'
    };
}


export default async function SearchPage({searchParams}:Props) {
    const { q } = await searchParams;
    // searchBooks에 의해서 필터링 된 결과는 books에 존재.
    const books = await searchBooks(q);
    return(
        <div className="max-w-3xl mx-auto p-8">
            {/* 검색 헤더 */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    {q ? `'${q}' 검색 결과(${books.length}건)` : '전체 도서 목록'}
                </h1>
                {(q && books.length > 0) && (
                    <Link href='/search' className="text-sm text-blue-500 hover:underline mt-1 block">
                        ← 전체 목록 보기
                    </Link>
                )}

                {/* 검색 결과 그리드 */}
                {books.length > 0 && (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Link href={`/book/${book.id}`}
                                    className="block p-4 border rounded-xl hover:shadow-md hover:border-blue-300 transition-all"
                                >
                                    <p className="font-bold text-gray-900">{book.title}</p>
                                    <p className="font-sm text-gray-500 mt-1">{book.author}</p>
                                    <p className="font-sm text-gray-600 mt-2 line-clamp-2">{book.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {/* 검색 결과 없음 */}
                {books.length === 0 && (
                    <div className='text-center py-20'>
                    <span className='text-4xl block mb-4'>🔍</span>
                    <p className='text-gray-500'>
                        <strong>&apos;{q}&apos;</strong>에 대한 검색 결과가 없습니다.
                    </p>
                    <Link href='/search'
                        className='mt-4 inline-block text-blue-500 hover:underline'>
                        전체 도서 보기
                    </Link>
                    </div>
                )}
            </div>
        </div>
    )
}