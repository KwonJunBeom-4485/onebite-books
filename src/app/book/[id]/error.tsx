'use client';  // error.tsx는 반드시 클라이언트 컴포넌트

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;  // 해당 세그먼트 재렌더링 시도
}

export default function BookDetailError({ error, reset }: Props) {
  useEffect(() => {
    // 실제 서비스: Sentry.captureException(error) 등으로 에러 전송
    console.error('[BookDetail 에러]', error.message);
  }, [error]);

  return (
    <div className='flex flex-col items-center gap-4 py-20 text-center max-w-md mx-auto'>
      <span className='text-5xl'>📚</span>
      <h2 className='text-xl font-bold text-red-500'>
        도서 정보를 불러올 수 없습니다.
      </h2>

      {/* 개발 환경에서만 에러 상세 노출 (프로덕션 보안) */}
      {process.env.NODE_ENV === 'development' && (
        <p className='text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded'>
          {error.message}
        </p>
      )}

      <button
        onClick={reset}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
      >
        ↺ 다시 시도
      </button>
    </div>
  );
}
