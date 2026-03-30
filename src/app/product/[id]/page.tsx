// PPR 활성화 : 이 라우트만 PPR활성화

import DynamicPrice from "@/components/dynamic-price";
import PriceSkeleton from "@/components/price-skeleton";
import StaticProductInfo from "@/components/static-product-info";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// next.config.ts에 ppr: 'incremental' 설정 여부 확인 후 처리
// export const experimental_ppr = true;

// 학습용 Mock 테이터 
const MOCK_PRODUCT_NAMES: Record<string, string> = {
    '1': '한 입 크기로 잘라먹는 리액트', 
    '2': '한 입 크기로 잘라먹는 타입스크립트',
    '3': '모던 자바스크립트 Deep Dive',
}

type Props = { params: Promise<{id: string}>};

// 메타 데이터 처리
export async function generateMetaData({params}:Props): Promise<Metadata> {
    const { id } = await params;
    const name = MOCK_PRODUCT_NAMES[id];
    if (!name) return {title: '상품을 찾을 수 없습니다.'};
    return {
        title: name,
        description: `${name} 상세 정보 및 가격을 확인하세요.`
    }
}

// page 작업
export default async function ProductionPage에서({params}:Props) {
    const { id } = await params;
    // 존재하지 않은 상품 id -> 404
    if (!MOCK_PRODUCT_NAMES[id]) return notFound();

    return(
        <div>
            {/* 1. 정적 셀 : 빌드시 HTML생성 -> CDN 즉시 서빙 */}
            {/* <StaticProductInfo id={id} /> */}
            <StaticProductInfo id={id} />
            {/* 2. 동적 구멍(Dynamic Hole) : 서버 요청시 처리...  */}
            <div>
                <h3>실시간 재고 &amp; 가격</h3>
                <Suspense fallback={<PriceSkeleton />}>
                    <DynamicPrice productId={id} />
                </Suspense>
            </div>
        </div>
        
    )
    
}