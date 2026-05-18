import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Suspense } from "react";
import UserGreeting from "@/components/user-greeting";
import Link from "next/link";
import HydrationGuard from "@/components/hydration-guard";

// 폰트 최적화 
// next/font/google: 빌드 타임에 폰트 파일을 가져와 /public 저장
// 런타임에 Google Fonts CDN 요청이 없으므로 성능과 프라이버시가 개선
// subsets : 한국어 폰트는 반드시 'latin'과 함께 'korean'을 포함
// display : 'swap' -> 폰트 로딩 전 시스템 폰트로 텍스트를 먼저 보여줌. 

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400','500','700'],
    display: 'swap',
    // css 변수로 내보내기. tailwind에서 font-noto처럼 사용할 수 있어요. 
    variable: '--font-noto-sans-kr',
})

// 메타 데이터 처리... 
// export 처리하고 있는 상황 : 전역 메타 데이터. 
// 전역 메타 데이터는 각 페이지별 메타 데이터가 없으면 이 값을 기본으로 사용. 
export const metadata: Metadata = {
  title: {
    template: '%s | 한입 북스',  // %s 자리에 각 페이지의 title이 들어감.
    default: '한입 북스',        // template이 없는 페이지의 기본.
  },
  description: "한입 북스 - 읽은 책을 기록하고 리뷰를 공유하세요.",
  // viewport, robots 등 메타 정도 여기서 관리 가능. 
  robots: { index: true, follow: true},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={notoSansKr.variable} >
      {/* suppressHydrationWarning 속성 지정 (공식 권장) - 방법1
          확장 프로그램이 body 속성을 주입해도 경고 발생하지 않음
      */}
      <body
          className={`${notoSansKr.variable} antialiased`}
          suppressHydrationWarning
      >
            {/* 
              방법2 : HydrationGuard (여러 속성 적극 제거)
            */}
            <HydrationGuard />

            {/* ThemeProvider가 children을 감싸면, children으로 전달된
            페이지들은 Server Component로 유지됨.*/}
            <ThemeProvider>
                <nav className='border-b px-6 py-3 flex items-center justify-between'>
                    <Link href="/"><span className='font-bold text-lg'>한입 북스</span></Link>
                    {/*
                    * ★ 핵심 패턴:
                    * Suspense 경계 = layout.tsx의 동적 구멍
                    * fallback: 쿠키 로드 전 표시될 정적 텍스트
                    * UserGreeting: 쿠키를 읽는 동적 컴포넌트 (별도 파일)
                    * layout.tsx 자체는 정적으로 유지됨
                    */}
                    <Suspense fallback={<span className='text-sm text-gray-400'>환영합니다!</span>}>
                        <UserGreeting />
                    </Suspense>
                </nav>
                {children}
            </ThemeProvider>
        </body>
    </html>
  );
}
