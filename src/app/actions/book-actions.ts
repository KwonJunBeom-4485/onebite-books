'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// 서버 액션 보안의 핵심 규칙: 
// 1. 모든 액션 최상단에 인증 검증을 배치
// 2. 클로저 암호화(자동)와 인증(수동)은 별개

// 인증 처리 헬퍼
async function requireAuth() {
    // 인증 정보 처리... 
    // 인증 정보를 쿠키에 저장! -- session
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session) {
        // 인증이 안된 액션 호출 -> 즉사 차단
        throw new Error('로그인이 필요합니다.');
    }
    // 실제 서비스 : JWT 검증, DB 세션 확인 등을 합니다. (*****)
    // 지금 현제는 학습을 위한 테스트 환경!!
    return { userId: session.value };    
}

// 액션 구현! - 도서 추가 액션
// useActionState를 사용하는 경우, 매개변수로 2개 받아 처리하는 액션으로 구현
// prevState, formData 매개변수를 전달받는 Action 함수로 설정!
export async function addBookAction(
    prevState: any, formData:FormData
) {
    // 1단계 : 인증 확인 - 가장 먼저 실행
    //  인증이 없는 비지니스 로직을 실행하면 보안 취약점 발생. 
    // 현재는 session.value에 있는 userId값을 가지고 처리하게 구현!!
    const { userId } = await requireAuth();
    console.log("form : ",formData);
    // 2단계 : 입력 유혀성 검증
    const title = formData.get('title')?.toString().trim();
    const author = formData.get('author')?.toString().trim();

    if (!title || !author) {
        throw new Error('제목과 저자는 필수입니다.');
    }

    // 3단계 : 비즈니스 로직 (인증 후 실행!!!)
    // 실제 서비스 작업 : DB에 도서를 저장
    console.log(`[${userId}] 도서 추가 : ${title} / ${author}`);

    // 4단계 : 캐시 재검증 - 페이지 데이터 갱신
    revalidatePath('/');
}

// 액션 구현! - 도서 삭제 액션
export default async function deleteBookAction(
    prevState: any, formData:FormData
) {
    // 인증 + 권한 확인(소유자, 관리자)
    const { userId } = await requireAuth();

    const bookId = formData.get('bookId')?.toString().trim();

    // 실제 서비스에서는 DB에서 소유자 정보를 확인 후 삭제... 
    console.log(`[${userId}] 도서 삭제 : ${bookId}`);

    revalidatePath('/');
}