//학습용 Mock 데이터를 생성!

import Link from "next/link";

// 검색 결과를 출력하는 컴포넌트로 생성!!!
const MOCK_ALL_BOOKS = [
  { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환' },
  { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환' },
  { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모' },
  { id: 4, title: 'You Don\'t Know JS', author: 'Kyle Simpson' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 6, title: 'The Pragmatic Programmer', author: 'David Thomas' },
];

interface Props {
    q?: string;
}

// async 서버 컴포넌트 : Suspense가 이 컴포넌트를 스트리밍합니다. 
export default async function SearchResults({q}:Props) {
    // 실제 API 연동시 교체해주세요. 
    // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
    // const endpoint = q
    //     ? `${baseUrl}/books?query=${encodeURIComponent(q)}`
    //     : `${baseUrl}/books`;
    // const res = await fetch(endpoint, {cache: 'no-store'});
    // if (!res) throw new Error('검색 결과를 가져오는 중 오류가 발생했습니다.');
    // const books = await res.json();

    // 학습용 Mock을 사용함으로 1초 지연 처리한 결과를 반환
    await new Promise((r) => setTimeout(r, 1000));

    const books = q
        ? MOCK_ALL_BOOKS.filter(
            (b) => 
                b.title.toLowerCase().includes(q.toLowerCase()) ||
                b.author.toLowerCase().includes(q.toLowerCase())
        )
        : MOCK_ALL_BOOKS;
    
    // 검색 내용이 없는 경우,
    if (books.length === 0) {
        return(
            <p className="text-gray-500 text-center py-10">
               <span className='text-4xl block mb-4'>🔍</span>
                <strong>&quot;{q}&quot;</strong>에 대한 검색 결과가 없습니다.     
            </p>
        );
    }
    // 검색 내용이 있는 경우,
    // 레이아웃이 SearchSkeleton의 그리드와 반드시 일치해야 합니다. 
    return(
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {books.map((book) => (
                <Link href={`/book/${book.id}`} key={book.id}>
                    <li
                        className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer"
                    >
                        <p className="font-bold text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                    </li>
                </Link>
            ))}

        </ul>
    )
    
}







