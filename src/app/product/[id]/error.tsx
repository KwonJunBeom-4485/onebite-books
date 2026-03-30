'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: Props) {
  useEffect(() => {
    console.error('[Product 에러]', error.message);
  }, [error]);

  return (
    <div className='flex flex-col items-center gap-4 py-20 text-center'>
      <span className='text-5xl'>📦</span>
      <h2 className='text-xl font-bold text-red-500'>
        상품 정보를 불러올 수 없습니다.
      </h2>
      {process.env.NODE_ENV === 'development' && (
        <p className='text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded'>
          {error.message}
        </p>
      )}
      <div className='flex gap-3'>
        <button onClick={reset}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
          다시 시도
        </button>
        <Link href='/'
          className='px-4 py-2 border rounded-lg hover:bg-gray-50'>
          홈으로
        </Link>
      </div>
    </div>
  );
}
