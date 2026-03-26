import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 폰트 최적화
// next/font/google: 빌드 타임에 폰트 타일을 가져와 /public 저장
// 이미 다운되면, 런타임에 Google Fonts CDN 요청할 필요가 없으므로 성능과 프라이버시가 개선
// subsets : 한글 폰트는 반드시 'latin'과 함께 'korean'을 포함
// display : 'swap' -> 폰트 로딩 전 시스템 폰트로 텍스트를 먼저 보여줌.

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  // css 변수로 내보내기.
  // tailwind에서 font-noto처럼 사용할 수 있음.
  variable: '--font-noto-sans-kr',
})

// 메타 데이터 처리..
// export 처리하고 있는 상황 : 전역 메타 데이터.
// 전역 메타 데이터는 각 페이지 별 메타 데이터가 없으면 이 값을 기본으로 사용
export const metadata: Metadata = {
  title: {
    template: '%s | 한 입 북스',  // %s 자리에 각 페이지의 title이 들어감.
    default: '한 입 북스',        // template이 없는 페이지의 기본
  },
  description: "한 입 북스 - 읽은 책을 기록하고 리뷰를 공유하세연",
  // viewport, robots 등 메타 정도 여기서 관리 가능.
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={notoSansKr.variable}>
      <body
        className={`${notoSansKr.variable} ${notoSansKr.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
