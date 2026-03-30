import Image from "next/image";

// typescript Interface
interface Props {
    src: string;
    alt: string;
    isHero?: boolean; // 상단 히어로 이미지 여부
}

// 외부 이미지용 최소 blur placeholder 
// next/image는 로컬 이미지는 자동 생성해줍니다. 
// 외부 url 이미지는 직접 blurDataURL을 제공해야 합니다. 
// 아래의 Base64코드로 작성된 작은 JPEG이미지를 생성.
const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYG' +
  'BQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC' +
  '0oMCUoKSj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAA/8QAFBEB' +
  'AAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aw/EAAAAAAAAAAA//2Q==';

export default function BookCover({src, alt, isHero = false}:Props) {
    // 이미지 최적화!!!!
    // aspect-[2/3] : 세로로 긴 책 표지 비율 유지를 사용 -> CLS 방지
    // relatvie: fill을 사용하는 Image의 부모는 반드시 relative 포지션
    return(
        <div className="relative w-full aspect-[2/3]">
            <Image 
                src={src}
                alt={alt}
                fill
                className="object-cover rounded-lg shadow-md"
                // sizes는 해상도 이미지를 제안
                // 최대 사이즈 폭 : 768px -> 768px 이하는 화면 넓이 100vw -100%, 
                // 33vw-화면의 1/3
                sizes="(max-width: 768px) 100vw, 33vw"
                // 히어로 이미지는 priority로 직시 로드...(LCP 점수 영향...)
                // priority=false인 경우에는 lazy-load되어 뷰포트 밖에서는 로드 안됨. 
                priority={isHero}
                // placeholder/blurDataURL 조건부 처리
                // 외부 이미지는 자동 blur 불가능... blurData를 직접 제공해야 됨.
                // isHero가 아닐 때는 'emtpy'로 기본 처리
                {...(isHero
                    ?{placeholder: 'blur' as const, blurDataURL: BLUR_PLACEHOLDER}
                    :{placeholder: 'empty' as const}
                )}
            />
        </div>
    );
    
}