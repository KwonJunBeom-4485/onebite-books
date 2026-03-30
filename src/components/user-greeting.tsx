import { cookies } from 'next/headers';

export default async function UserGreeting() {
  // cookies() → 이 컴포넌트가 동적으로 처리되는 이유
  const cookieStore = await cookies();
  const userName = cookieStore.get('user-name')?.value ?? '방문자';

  return <span className='text-sm font-medium'>안녕하세요, {userName}님!</span>;
}
