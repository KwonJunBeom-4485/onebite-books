// Dynamic Hole Component
// 실시간으로 가격을 반환하는 동적 컴포넌트. 요청 시점 마다 실행해서 CDN 캐시에 포함되지 않음
// 현재 실시간 처리를 할 API 연동 내용이 없어서 Mock으로 대체
// fetch 에러 처리를 res.ok 체크 포함 방식으로 개선
// -> 빌드시 정적 셀에 포함되지 않고, 매 요청시 서버에서 실행되어 스트리밍으로 전달. 

import { cookies } from "next/headers";

// 학습용 Mock 가격 데이터 
// 실제 서비스에서는 DB 또는 외부 API로 교체
const MOCK_PRICES: Record<string, {KR: number; US: number; JP: number}> = {
    '1': {KR: 28000, US: 22, JP: 3200},
    '2': {KR: 32000, US: 25, JP: 3600},
    '3': {KR: 45000, US: 35, JP: 5000},
};

const MOCK_STOCK: Record<string, number> = {
    '1':15, '2':3, '3':0,
};

// 통화 포맷 헬퍼
function formatPrice(price: number, region: string): string {
    const localeMap : Record<string, string> = {
        KR: 'ko-KR', US: 'en-US', JP: 'ja-JP',
    };
    const currencyMap: Record<string, string> = {
        KR: 'KRW', US: 'USD', JP: 'JPY',
    }
    return price.toLocaleString(localeMap[region] ?? 'ko-KR', {
        style: 'currency',
        currency: currencyMap[region] ?? 'KRW', 
        maximumFractionDigits: 0,
    });
}

// 실제 API 연동시 여기에 함수만 교체 하면됨.
async function fetchPrice(productId:string, region: string) {
    // TODO : 실제 API 연동시 작업 코드는 아래와 비슷하게 작업
    // const res = await fetch(
    //     `https://apiserver.com/price/${productId}?region=${region}`,
    //     {cache: 'no-store'}
    // );
    // if (!res) throw new Error(`가격 조회 실패 : ${res.status}`);
    // return res.json() as Promise<{price: number; stock:number}>;

    // 학습 설정: Mock : 0.5초 지연으로 실시간 API 시뮬레이션
    await new Promise(r => setTimeout(r, 500));
    const prices = MOCK_PRICES[productId] ?? {KR:29000, US: 23, JP: 3300};
    const stock = MOCK_STOCK[productId] ?? 10;
    const validRegion = ['KR','US','JP'].includes(region) ? region : 'KR';
    return { price: prices[validRegion as 'KR'|'US'|'JP'], stock};
}

export default async function DynamicPrice({productId}:{productId: string;}) {
    // 동적 구멍이 된 이유는 cookies() -> await가 필수이기 때문.... 
    // cookie에 지역 정보를 포함... 
    const cookieStore = await cookies();
    const userRegion = cookieStore.get('region')?.value ?? 'KR';

    const { price, stock } = await fetchPrice(productId, userRegion);

    return (
        <div className="space-y-2">
            <p className="text-3xl font-bold text-red-600">{formatPrice(price, userRegion)}</p>
            <p className={`text-sm font-medium ${stock > 0 ? 'text-green-600':'text-red-500'}`}>
                {stock > 0 ? `재고 ${stock}개 남음`:'품절'}
            </p>
            <p className="text-xs text-gray-400">지역: {userRegion}</p>
        </div>
    )
}