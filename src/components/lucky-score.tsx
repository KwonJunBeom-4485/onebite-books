"use client";

import { useEffect, useState } from "react";

// 서버와 클라이언트가 서로 다른 값 생성

// 잘못된 방식 (클라이언트와 서버가 각 각 실행되어 랜덤 값이 서로 다르게 나온다. 데이터 불일치)
// export default function LuckyScore() {
//     return <div>행운의 숫자 : {Math.floor(Math.random()*100)}</div>;
// }

// 올바른 방식 : useEffect로 클라이언트 실행 격리
export default function LuckyScore() {
    // null : 초기 값 -> 서버 랜더링 결과와 동일 (null)
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        setScore(Math.floor(Math.random()*100));
    }, []);

    // 초기 랜더링(서버 포함) : null -> '계산 중...' 표시
    // 서버 HTML : <div>계산 중...</div>
    // 클라이언트 초기 : <div>계산 중...</div> <- 동일하기 있다가
    // useEffect 후 : <div>오늘의 행운 점수 : 42</div>
    if(score === null) return <div>계산 중...</div>;

    return <div>행운의 숫자 : {score}</div>;
}