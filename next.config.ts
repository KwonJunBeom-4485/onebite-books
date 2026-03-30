import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
  1. output 설정 : 빌드 산출물 생성(도커 배포 시 필수)
  2. images에 대한 remotePatterns 생성
    remotePatterns를 등록해야 하는 이유?
    Next.js는 보안을 위해 허용된 도메인의 이미지만 최적화한다.
    등록되지 않은 외부 이미지를 <Image src=...> 에 넣으면 런타임 에러 발생.
    pathname: '/**' 의 의미는 해당 호스트의 모든 경로를 허용하겠다는 의미
    특정 폴더만 허용하고 싶다 = 'images/**' 처럼 좁게 지정해서 사용 가능
  */

  // 도커 배포 시 필수 설정 - standalone 단독 실행 가능한 빌드 산출
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // 모든 하위 경로 허용
      },
      {
        protocol: 'https',
        // 실제 API 서버를 구동하는 경우에는? 외부에 이미지가 있다는 의미
        // hostname: 서버 호스트 이름을 작성해 추가해야 next.js 가 런타임 에러X
        // picsum.photos는 공개 이미지를 북커버로 사용하기 위해서 허용!
        hostname: 'picsum.photos',
      },
    ],
  },

  // PPR 활성화 설정 추가
  experimental: {
    // 'incremental' : 접체 앱이 아닌 특정 라우트에서만 선택적으로 PPR 사용.
    // 각 page.tsx에서 export const experimental_ppr = true로 개별 활성화
    // true로 설정하면 PPR 적용.
    // ppr: true 이면 앱 전체 적용. 모든 Suspense는 동적 구멍(dynamic hole)로 처리 됨.
    // ppr: 'incremental',
    // cacheComponents: true,
  }


};

export default nextConfig;
