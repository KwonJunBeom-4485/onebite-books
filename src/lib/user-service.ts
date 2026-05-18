// server-only : 이 파일이 클라이언트 번들에 포함되면 빌드 에러 발생.
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react';
import 'server-only';

// User타입 : passwordHash는 절대 클라이언트에 노출되면 안됨.
interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    apiToken: string;
}

// 학습용 Mock 유저 데이터
const MOCK_USERS: Record<string, User> = {
    'user_01': {
        id: 'user_01',
        name: '홍길동',
        email: 'hong@naver.com',
        passwordHash: '\$2b\$10\$secrethashedpassword...',
        apiToken: 'sk-secret-api-token-abc1231',
    },
};

// getUserProfile : 내부 전용 함수... (export 제거)
// taint 객체를 그대로 return하면 호출자가 실수로 cc에 전달 가능
// -> 내부에서만 사용하고 반드시 getSafeUserProfile로 접근하게 강제
async function getUserProfile(id:string):Promise<User> {
    const user = MOCK_USERS[id];
    if(!user) throw new Error(`유저 '${id}'를 찾을 수 없습니다.`);

    // taintObjectReference : 객체 전체를 오염으로 표시
    // 이 객체를 cc props로 전달하면 런타임 에러 발생
    experimental_taintObjectReference('User 전체 객체는 cc로 전달 불가, getSafeUserProfile()을 사용하세요.', user)

    // taintUniqueValue : 개별 민감 값도 별도 오염
    // 객체가 분해되어도 값 자체가 cc로 가면 에러
    experimental_taintUniqueValue('passwordHash는 cc로 전달 불가.', user, user.passwordHash);
    experimental_taintUniqueValue('apiToken은 cc로 전달 불가.', user, user.apiToken);

    return user;
}

export async function getSafeUserProfile(id:string) {
    const user = await getUserProfile(id);

    // 안전한 필드만 추출 - 오염 빌드 (passwordHash, apiToken) 제외
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        // passwordHash: user.passwordHash, // 얘 키면 /profile 에서 Error 처리.
    }
}