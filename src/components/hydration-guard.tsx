export default function HydrationGuard() {
  // 제거할 확장 프로그램 속성 목록
  // ColorZilla: cz-shortcut-listen
  // Grammarly: data-gr-c-r, data-new-gr-c-s-check-loaded
  const EXTENSION_ATTRS = [
    'cz-shortcut-listen',
    'data-gr-c-r',
    'data-new-gr-c-s-check-loaded',
    'data-gr-ext-installed',
  ];

  const script = `
    (function() {
      const ATTRS = ${JSON.stringify(['cz-shortcut-listen','data-gr-c-r','data-new-gr-c-s-check-loaded','data-gr-ext-installed'])};

      // 이미 주입된 속성 즉시 제거
      ATTRS.forEach(function(attr) {
        if (document.body.hasAttribute(attr)) {
          document.body.removeAttribute(attr);
        }
      });

      // MutationObserver: 재주입 감시
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' &&
              ATTRS.includes(mutation.attributeName)) {
            document.body.removeAttribute(mutation.attributeName);
          }
        });
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ATTRS,
      });

      // ★ 메모리 누수 방지: 페이지 이탈 시 observer 해제
      window.addEventListener('beforeunload', function() {
        observer.disconnect();
      });
    })();
  `;

  return (
    <script
      id='hydration-guard'
      // ★ dangerouslySetInnerHTML: CSP 정책과 충돌 가능
      // CSP에 'unsafe-inline'이 없으면 스크립트가 차단됩니다.
      // suppressHydrationWarning 방법이 더 안전합니다.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
