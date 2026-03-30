'use client';
// Context API 설정
// Theme 를 light와 Dark 로 구분. 

import { createContext, useContext, useState } from "react";

// Theme는 'light'와 'dark' 이 두 개의 값만을 사용!
type Theme = 'light' | 'dark';

// Context 타입 지정... 
type ThemeContextType = {
    theme: Theme;           // theme 객체는 'light' 또는 'dark'만 존재함. 
    toggle: () => void;     // toggle은 함수 정의 - 매개변수 없이 반환 값 없이! 
};

// createContext 기본값 : Provider 외부에서 훅을 호출했을 때 반환되는 값. 
// undefined로 설정하면 외부 호출시 런타입 에러로 명확히 감지 가능. 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 사용자 훅!! - useTheme() : 사용자가 쓰는 커스텀 훅
export function useTheme(): ThemeContextType {
    // createContext로 생성된 context 안의 값을 불러 사용하는 훅
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme은 ThemeProvider 안에서만 사용할 수 있어요.');
    }
    return context;
}

// Provider : ThemeProvider는 children을 ThemeContext로 감싸는 컴포넌트
// layout.tsx에서 이 컴포넌트를 children 밖에서 감쌉니다.
export default function ThemeProvider({
    children,
}:{children: React.ReactNode;}
) {
    // 
    const [theme, setTheme] = useState<Theme>('light');

    function toggle() {
        setTheme(prev => prev ==='light' ? 'dark' : 'light');
    }

    return(
        <ThemeContext.Provider value={{theme, toggle}}>
            {/* theme에 따라서 최상위 div의 배경색과 텍스트 색상을 변경 */}
            <div
                className={
                    theme === 'dark'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-black'
                }
                style={{minHeight: '100vh'}}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

