'use client';

import { useTheme } from "./theme-provider";

export default function ThemeToggleButton() {
    const {theme, toggle} = useTheme();

    return(
        <button
            onClick={toggle}
            className="px-4 py-2 rounded-lg border transition-colors 
                dark:border-gray-600 hover:opacity-80"
            // arial-label : 스크린리터 접근성
            arial-label={`현재 ${theme} 모드. 클릭하면 전환합니다.`}
        >
            {theme ==='light' ? '🌙 다크모드' : '☀️ 라이트 모드'}
        </button>
    )
}