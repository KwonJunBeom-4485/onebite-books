// books 도서 정보 처리하는 API 구성.... 

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { title } from "process";

// [API 엔드 포인트 설계]
//  메서드      URL                    역할              응답코드
//  GET       /api/books        전체 도서 목록 반환        200
//  POST      /api/books        새 도서 생성              201 Created, 401, 400            
//  GET       /api/books/:id    도서 상세 반환            200/404
//  DELETE    /api/books/:id    도서 삭제                 200/401/404

// 지금은 학습으로 Mock 데이터 저장소... 
// 실제 서비스에서는 DB로 교체해서 사용. 
// 값을 추가할 수 있게 MOCK_BOOKS라는 변수를 선언하는데 let으로 선언... 
let MOCK_BOOKS = [
    { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환' },
    { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환' },
    { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모' },
]

// 공통 에러 응답 헬퍼
function errorResponse(message: string, status: number) {
    return NextResponse.json({error: message}, {status});
}

// GET 메서드 요청 : /api/books -> 전체 목록   
// 권한 : 권한 없이 모두 접근가능 일 경우가 큼. 
export async function GET(request:NextRequest) {
    // 쿼리 파라미터 : 필터링해서 목록 가져오기 할 때에, 파라미터 값을 사용. 
    //   ?author=이정환 인 경우와 같이 필터링이 가능. 
    const author = request.nextUrl.searchParams.get('author');

    const result = author
        ? MOCK_BOOKS.filter(b => b.author === author)
        : MOCK_BOOKS;
    
    return NextResponse.json({books: result, total: result.length});
    
}

// POST 메서드 요청 : /api/books -> 도서 생성 
// 권한 : 권한 필요. 관리자 권한.
export async function POST(request:NextRequest) {
    // 중요: 인증 확인! -> admin-token 쿠키가 없으면 생성 불가능... 
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin-token');

    // 권한 없음에 대한 Code : 401
    if (!adminToken) {
        return errorResponse('관리자 권한이 필요합니다.', 401);
    }

    // 생성을 위한 데이터를 요청 정보를 확인!!! (body(http)에 정보 들어가 있음)
    let body: { title?: string; author?: string};
    try {
        body = await request.json();
    }catch {
        // Bad Request!!
        return errorResponse('요청 형식이 올바르지 않습니다.', 400)
    }

    // 검증!!! 필드 검증
    if (!body.title || !body.author) {
        return errorResponse('title과 author는 필수입니다.', 400)
    }

    // 데이터를 추가 작업
    const newBook = {
        id: MOCK_BOOKS.length + 1,
        title: body.title,
        author: body.author,
    };

    MOCK_BOOKS.push(newBook);

    return NextResponse.json(newBook, {status: 201});
    
}



