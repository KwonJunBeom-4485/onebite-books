// Mock 데이터 : 개별 책 정보 읽기와 삭제.... 

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 실제 데이터 베이스에서 조회해서 작업하는 영역
const MOCK_BOOKS = [
    { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환' },
    { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환' },
    { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모' },
]

// 공통 에러 응답 헬퍼
function errorResponse(message: string, status: number) {
    return NextResponse.json({error: message}, {status});
}

// 타입스크립트를 위한 type
type RouteContext = {params: Promise<{id: string}>};

// 도서 상세 - GET  /api/books/:id
export async function GET(request:NextRequest, {params}:RouteContext) {
    // 특정 도서정보를 가져오는 기능 구현. 

    // 1. params 값 가져오기
    const { id } = await params;

    // 쿼리 파라미터: ?include=reviews
    const includeReviews = request.nextUrl.searchParams.get('include') === 'reviews';

    // 2. id 유효성 검증
    const numId = Number(id); // Number()를 사용한 이유... id는 문자열
    if (!Number.isInteger(numId) || numId < 1) {
        return errorResponse('올바르지 않은 도서 ID입니다.', 400);
    }

    // 3. 있는 경우(200), 없는 경우(404)
    const book = MOCK_BOOKS.find(b => b.id === numId);
    if (!book) {
        return errorResponse(`도서 ID ${id}를 찾을 수 없습니다.`, 404);
    }

    // 응답에 가상의 review 값도 추가해서 전달.... 
    return NextResponse.json({
        ...book,
        ...(includeReviews && {
            reviews: [
                {id: 1, content: '입문서로 최고입니다.!!!', rating: 5},
                {id: 2, content: '실무에 바로 적용했어요~', rating: 5},
            ],
        }),
    });
}

// 도서 상세 - DELETE  /api/books/:id
export async function DELETE(_request:NextRequest, {params}:RouteContext) {
    // 1. params 값 가져오기
    const { id } = await params;

    // 2. 인증 확인
    // DELETE 데이터를 변경하기 때문에 반드시 권한 확인
    const cookiesStore = await cookies();
    const adminToken = cookiesStore.get('admin-token');

    if (!adminToken) {
        return errorResponse('관리자 권한이 필요합니다.', 401);
    }

    // 3. id 유효성 검증
    const numId = Number(id); // Number()를 사용한 이유... id는 문자열
    if (!Number.isInteger(numId) || numId < 1) {
        return errorResponse('올바르지 않은 도서 ID입니다.', 400);
    }

    // 4. 있는 경우 삭제, 없으면(404)
    const exists = MOCK_BOOKS.some(b => b.id === numId);
    if(!exists) {
        return errorResponse(`도서 ID ${id}를 찾을 수 없습니다.`, 404);
    }

    //실제 서비스 : DB에서 삭제
    console.log(`도서 ${id} 삭제되었습니다.`);

    return NextResponse.json({deleted: true, id});

}