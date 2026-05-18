// sc : getSafeUserProfile로 안전 데이터를 조회 후 cc에게 전달 (user-service.ts는 sercer-only라서 export된 함수를 통해 값을 받기)

import UserProfileCard from "@/components/user-profile-card";
import { getSafeUserProfile } from "@/lib/user-service";

export default async function ProfilePage() {
    // getSafeUserProfile : 안전한 빌드 반환
    const safeUser = await getSafeUserProfile('user_01');

    return(
        <main className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">내 프로필</h1>
            {/* safeUser : getSafeUserProfile 반환 값으로 전달 가능
                만약 User 전체 객체를 전달하면?
            */}
            <UserProfileCard user={safeUser} />
        </main>
    );
}