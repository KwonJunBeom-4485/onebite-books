import { cookies } from 'next/headers';
import Link from 'next/link';

// 학습용 Mock 도서 목록 (실제 서비스에서는 DB에서 조회)
const MOCK_BOOKS = [
  { id: 1, title: '한 입 크기로 잘라먹는 리액트', author: '이정환', status: '판매중' },
  { id: 2, title: '한 입 크기로 잘라먹는 타입스크립트', author: '이정환', status: '판매중' },
  { id: 3, title: '모던 자바스크립트 Deep Dive', author: '이웅모', status: '품절' },
];

export default async function AdminPage() {
  // ── 서버 컴포넌트에서 쿠키 읽기 ──────────────────────
  // middleware.ts에서 이미 검증했지만, 서버 컴포넌트에서
  // 다시 한 번 확인하는 것이 보안상 더 안전합니다.
  // (미들웨어는 Edge Runtime, 여기는 Node.js Runtime — 독립적)
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin-token');

  // 쿠키가 없으면 서버 측에서도 접근 차단 (이중 보호)
  // 실제 서비스에서는 토큰 유효성(만료, 서명 등)도 검증해야 합니다.
  if (!adminToken) {
    return (
      <div className='p-8 text-center'>
        <p className='text-red-500 font-bold'>접근 권한이 없습니다.</p>
        <Link href='/' className='text-blue-500 underline mt-2 block'>홈으로</Link>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-8'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl font-bold'>🔐 관리자 대시보드</h1>
        {/* 실제 서비스: 로그아웃 Server Action 연결 */}
        <span className='text-sm text-gray-500'>
          관리자 토큰: {adminToken.value.slice(0, 6)}***
        </span>
      </div>

      {/* 도서 관리 테이블 */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>📚 도서 목록 관리</h2>
        <table className='w-full border-collapse border border-gray-200 rounded-lg overflow-hidden'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='border border-gray-200 px-4 py-3 text-left text-sm'>ID</th>
              <th className='border border-gray-200 px-4 py-3 text-left text-sm'>제목</th>
              <th className='border border-gray-200 px-4 py-3 text-left text-sm'>저자</th>
              <th className='border border-gray-200 px-4 py-3 text-left text-sm'>상태</th>
              <th className='border border-gray-200 px-4 py-3 text-left text-sm'>관리</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BOOKS.map((book) => (
              <tr key={book.id} className='hover:bg-gray-50'>
                <td className='border border-gray-200 px-4 py-3 text-sm'>{book.id}</td>
                <td className='border border-gray-200 px-4 py-3 text-sm font-medium'>{book.title}</td>
                <td className='border border-gray-200 px-4 py-3 text-sm'>{book.author}</td>
                <td className='border border-gray-200 px-4 py-3 text-sm'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${ book.status === '판매중'
                    ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className='border border-gray-200 px-4 py-3 text-sm'>
                  <Link href={`/book/${book.id}`}
                    className='text-blue-500 hover:underline text-xs'>보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
