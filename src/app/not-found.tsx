// not-found.tsx: notFound()가 호출되거나 매칭 경로가 없을 때 표시
// 'use client' 불필요 — 서버 컴포넌트로 작동
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center gap-4 py-20 text-center'>
      <span className='text-6xl'>🔍</span>
      <h2 className='text-2xl font-bold'>페이지를 찾을 수 없습니다</h2>
      <p className='text-gray-500'>
        요청하신 도서 또는 페이지가 존재하지 않습니다.
      </p>
      <Link
        href='/'
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
