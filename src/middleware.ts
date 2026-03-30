import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
// middleware.ts는 /src/바로 밑에 있어야 합니다. 
// next.config.ts와 같은 위치가 아님.....


// Edge Runtime에서 동작하기 때문에 Node.js API(fs, crypto등) 사용 불가
export function middleware(request: NextRequest) {
    // URL 경로
    const { pathname } = request.nextUrl;

    // ── 정적 파일·내부 경로는 즉시 통과 ──────────────────
    // 이 처리가 없으면 .png, .ico 요청도 미들웨어를 거치게 됩니다.
    // matcher로 범위를 제한했다면 불필요하지만 방어적으로 추가합니다.
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')         // 정적 파일 (확장자 있는 경로)
    ) {
        // NextResponse.next() 통과... 
        return NextResponse.next();
    }

    // ── /admin 경로 보호 ───────────────────────────────────
    if (pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get('admin-token');

        if (!adminToken) {  // admin-token 없는 경우... 
            // ★ 리다이렉트 시 원래 경로를 쿼리로 저장 → 로그인 후 복귀 가능
            const url = new URL('/', request.url);
            url.searchParams.set('from', pathname);  // 예: /?from=/admin/users
            return NextResponse.redirect(url);
        }
    }

    // ── /my-page 경로 보호 ────────────────────────────────
    if (pathname.startsWith('/my-page')) {
        const userSession = request.cookies.get('session');

        if (!userSession) {
            const url = new URL('/login', request.url);
            // callbackUrl: 로그인 성공 후 돌아올 페이지 URL
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// matcher: 미들웨어를 적용할 경로 패턴 지정할 수 있어요. 
// matcher에 포함되지 않는 경로는 미들웨어를 거치지 않습니다. 
// 정적 파일(_next/static 등)은 자동으로 제외됩니다. 
export const config = {
    matcher: ['/admin/:path*', '/my-page/:path*']
}