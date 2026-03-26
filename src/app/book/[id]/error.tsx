'use client';  // ← error.tsx는 반드시 클라이언트 컴포넌트!

import { useEffect } from 'react';

// typescript 인터페이스
interface Props {
  // error: Next.js가 자동으로 전달하는 에러 객체
  // digest: 서버 에러의 고유 ID (로그 추적용)
  error: Error & { digest?: string };
  // reset: 해당 세그먼트를 다시 렌더링 시도하는 함수
  reset: () => void;
}

export default function BookDetailError({ error, reset }: Props) {
  useEffect(() => {
    // 실제 서비스에서는 Sentry, Datadog 등 에러 추적 서비스로 전송
    // 학습 환경에서는 콘솔 출력으로 대체
    console.error('[BookDetail 에러]', error.message, error.digest);
  }, [error]);

  return (
    <div className='flex flex-col items-center gap-4 py-20 text-center'>
      <span className='text-5xl'>📚</span>
      <h2 className='text-xl font-bold text-red-500'>
        도서 정보를 불러올 수 없습니다.
      </h2>
      {/* 개발 환경에서만 에러 메시지 노출 (보안) */}
      {process.env.NODE_ENV === 'development' && (
        <p className='text-sm text-gray-400 font-mono'>
          {error.message}
        </p>
      )}
      <button
        onClick={reset}  // 다시 렌더링 시도
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
      >
        다시 시도
      </button>
    </div>
  );
}
