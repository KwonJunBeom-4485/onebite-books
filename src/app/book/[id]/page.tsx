import BookCover from "@/components/book-cover";
import RelatedBooks from "@/components/related-books";
import ReviewList from "@/components/review-list";
import { RelatedSkeleton, ReviewListSkeleton } from "@/components/skeleton/book-detail-skeleton";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const MOCK_BOOKS: Record<string, 
    {title:string; author:string;description:string; cover:string}> = {
    '1':{
        title: '한 입 크기로 잘라먹는 리액트',
        author: '이정환',
        description: 'React 기초부터 심화까지, 한 입 크기 예제로 배우는 완전 정복 가이드.',
        cover: 'https://picsum.photos/seed/book1/400/600',
    }
    ,
    '2': {
    title: '한 입 크기로 잘라먹는 타입스크립트',
    author: '이정환',
    description: 'TypeStript 기초부터 심화까지, 한 입 크기 예제로 배우는 완전 정복 가이드.',
    cover: 'https://picsum.photos/seed/book2/400/600', 
    },
    "3": {
      title: '모던 자바스크립트 Deep Dive',
      author: '이웅모',
      description: '모던 자바스크립트 기초부터 심화까지, 완전 정복 가이드.',
      cover: 'https://picsum.photos/seed/book3/400/600',
    }
    ,
    '4': {
      title: 'You Don\'t Know JS',
      author: 'Kyle simpson',
      description: '자바스크립트 기초 정리할 수 있는 입문서.',
      cover: 'https://picsum.photos/seed/book4/400/600',
    },
    '5':{
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: '실무에서 사용되는 코드를 깔끔하게 정리 구성하는 기법과 기술.',
      cover: 'https://picsum.photos/seed/book5/400/600',
    },
}


// 타입 스트립트 (interface 설정과 비슷한 기능) 문법
type Props = { params: Promise<{id:string}>}


// 동적 SEO 메타 데이터 처리.... 
// generateMetadata()

// [동작 흐름]
//  사용자 접근:/book/34  => Next.js: generateMetadata({params: {id: '34'}}) 호출
//  => API fetch (지금은 Mock 데이터) -> 도서 정보 조회
//  => <head>태그에 <title>, <meta>, <og:*> 자동 주입
//  => page.tsx의 BookDetailPage 컴포넌트 랜더링.... 
//  <og:*> og는 각 도서 페이지마다 고유한 title/description/OG 이미지를 생성. 
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { id } = await params;
    const book = await getBook(id);

    // 도서를 찾지 못하면 기본 메타데이터 반환 (페이지는 notFound()로 처리)
    if (!book) {
        return {title: '도서를 찾을 수 없습니다. '};
    }

    return {
        // title: template 설정 시에 '한 입 크기로 잘마먹는 리액트 | 한입 북스'로 자동 조합
        title: book.title,
        description: book.description,
        openGraph: {
            title: `${book.title} - 한입 북스`,
            description: book.description,
            images: [
                {
                    //실제 서비스에서는 book.cover URL 사용
                    url: book.cover ?? '/default-thumbnail.png',
                    width: 1200,
                    height: 640,
                    alt: book.title,
                },
            ],
            type: 'article'
        },
        // Twitter Card (SNS 미리보기)
        twitter: {
            card: 'summary_large_image',
            title: book.title,
            description: book.description
        }
    };
}


// ─────────────────────────────────────────────────────────
// 실제 API 연동 시 교체할 fetch 함수
// ─────────────────────────────────────────────────────────
async function getBook(id: string) {
    // fetch를 이용한 API통신 데이터를 처리.
    // 실제로는 데이터 로딩하는 시간이 소요됨. 
    // 실습 환경이라 시뮬레이션을 위해서 지연처리
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_BOOKS[id] ?? null;
}



export default async function BookDetailPage({params}:Props) {
    const { id } = await params;
    const book = await getBook(id);

    // 도서 없는 경우, 내장 404 페이지로 이동
    if (!book) notFound();

    return(
        <div className="max-w-2xl mx-auto space-y-10">
            <article className="max-w-2xl mx-auto p-8">
                <div className="flex flex-col md:flex-row gap-8 p-8 border rounded-xl">
                    <div className="w-full md:w-64 apect-2/3 bg-gray-200 rounded-lg shrink-0">
                        <BookCover src={book.cover} alt={book.title} isHero={true} />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <p className="text-gray-500 mt-1">저자 : {book.author}</p>
                        <p className="mt-4 text-gray-700 leading-relaxed">{book.description}</p>
                    </div>
                </div>
            </article>
            {/* 리뷰 목록 : Suspense로 독립 스트리밍 */}
            <section>
                <h2 className="text-xl font-bold mb-4">💬 독자 리뷰</h2>
                {/* 
                    Suspense는 ReviewList를 호출하는 부모인 이 컴포넌트에 위치하게 됩니다.(***)
                    fallback : ReviewList가 데이터를 기다리는 동작 보여줄 UI
                    ReviewList 안에서 자기 자신을 Suspense로 감싸면 작동하지 않아요.  
                */}
                <Suspense fallback={<ReviewListSkeleton />}>
                    <ReviewList bookId={id}/>
                </Suspense>
            </section>

            {/* RelatedBooks  추가  */}
            <section>
                <h2 className="text-xl font-bold mb-4">📚 관련 도서</h2>
                {/*  두번째 독립 Suspense 구현 */}
                <Suspense fallback={<RelatedSkeleton />}>
                    <RelatedBooks bookId={id} />
                </Suspense>
            </section>
        
        </div>
    );
    
}