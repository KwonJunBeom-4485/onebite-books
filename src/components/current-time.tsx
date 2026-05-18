"use client";

import { useEffect, useState } from "react";

// new Date() - 얘도 서버랑 클라이언트가 다른 값을 반환함.
// 이 경우에도 useEffect()로 클라이언트의 실행을 격리해라..

export default function CurrentTime() {
    // null : 서버 랜더링 시 초기 상태
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        // 하이드레이션 후 최소 1회 실행
        setNow(new Date());

        // 1초마다 시계 업데이트(선택사항)
        const timer = setInterval(() => setNow(new Date()), 1000);

        // 클린업 : 컴포넌트 언마운트 시 interval 제거
        // 클린업이 없으면 메모리 누수 발생
        return (() => clearInterval(timer));
    }, []);

    // 서버/클라이언트 초기 랜더링 : 동일한 '로딩 중...' 표시
    if(!now) return <span className="text-gray-400">로딩 중...</span>;

    return <span className="text-sm text-gray-600">{now.toLocaleTimeString('ko-KR')}</span>;
}