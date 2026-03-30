// 라우트 핸들러 : /api/auth/session/route.ts
// 쿠키 정보 처리 :
//     1. 사용자 쿠키가 있는 경우 : 200 {user: {id, name, role}}
//     2. 사용자 쿠키가 없는 경우 : 401 {user: null }

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 라우트 핸들러는 파일명 : route.ts
// 같은 폴더에 page.tsx와 같이 있으면 에러 발생. 

// 공통 에러 응답 헬퍼 - 일관된 형식으로 에러를 반환
// { error: string } 형식을 통일하면 클라이언트에서 처리하기 쉬워짐. 
function errorResponse(message: string, status: number) {
    return NextResponse.json({ error: message }, {status});
}

// 통신 메서드 구현!!
// HTTP 메서드를 이용 : GET, POST, PUT, DELETE

// GET 메서드 이용z
export async function GET() {
    const cookieStore = await cookies();  // cookies() 함수는 쿠키 객체값을 반환 함수. 
    const sessionToken = cookieStore.get('session-token');

    // session은 서버 연결 정보... 
    if(!sessionToken) {   // sessionToken 인증 정보가 없는 경우...
        // 401 Unauthorized : 인증 정보 없음
        return errorResponse('인증이 필요합니다.', 401); 
        //{error:'인증이 필요합니다.',status:401 } 값 반환 값으로 전달
    }

    // 학습용으로 Mock : 실제 서비스에서는 다음과 같은 로직 구현
    //  1. sessionToken.value를 JWT 라이브러리 호출
    //  2. 페이로드에서 userId 추출
    //  3. DB에서 유저 정보를 조회 후 반환
    const user = {
        id: 'user_01',
        name: '홍길동',
        role: 'ADMIN' as const, 
    };
    // 200 OK : 유저 정보 반환
    return NextResponse.json({user});

}


