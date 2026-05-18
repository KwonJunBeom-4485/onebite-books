// cc - client component
"use client";

// UserProfileCard : 안전한 유저 데이터를 받아 표시하는 cc
// getSafeUserProfile() 반환 값만 props로 받게 만들어요.
// 오염된 User 객체를 전달하면 런타임 에러 발생 -> Taint API 검증

// typescript - interface, type
interface SafeUser {
    id: string;
    name: string;
    email: string;
    // passwordHash: string;
    // passwordHash는 없음 (안전한 필드만 처리)
}

export default function UserProfileCard({user}:{user:SafeUser}) {
    return(
        <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">ID : {user.id}</p>
        </div>
    );
}