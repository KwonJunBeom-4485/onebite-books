# ── Stage 1: deps ────────────────────────────────────────────
# node_modules만 설치하는 단계. 소스 코드는 포함하지 않습니다.
FROM node:20-alpine AS deps

# libc6-compat: Alpine Linux에서 일부 npm 패키지가 필요로 하는 호환성 라이브러리
RUN apk add --no-cache libc6-compat

WORKDIR /app

# package.json과 lock 파일만 먼저 복사
# 소스가 바뀌어도 의존성이 그대로면 이 레이어는 캐시를 재사용합니다.
COPY package.json package-lock.json* ./

# --frozen-lockfile: lock 파일과 package.json이 일치하지 않으면 에러 발생
# 프로덕션 배포에서 예기치 않은 버전 업데이트를 방지합니다.
RUN npm ci --frozen-lockfile

# ── Stage 2: builder ─────────────────────────────────────────
# 소스 코드를 복사하고 Next.js 빌드를 실행하는 단계
FROM node:20-alpine AS builder

WORKDIR /app

# Stage 1에서 설치한 node_modules를 복사
COPY --from=deps /app/node_modules ./node_modules

# 나머지 소스 파일 전체 복사 (.dockerignore에서 제외된 파일은 복사 안 됨)
COPY . .

# ─────────────────────────────────────────────────────────────
# 빌드 타임 환경 변수 주입
# NEXT_PUBLIC_* 변수는 빌드 시점에 번들에 포함되므로 여기서 전달해야 합니다.
# 런타임(docker run -e)으로 전달하면 적용되지 않습니다!
# ─────────────────────────────────────────────────────────────
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# NEXT_TELEMETRY_DISABLED: Next.js의 익명 사용 통계 수집 비활성화
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: runner ──────────────────────────────────────────
# 빌드 산출물만 담은 최종 경량 이미지
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 보안: root 대신 별도 사용자로 실행
RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# public 폴더: 정적 파일(이미지, favicon 등)
COPY --from=builder /app/public ./public

# standalone 빌드 산출물 복사
# .next/standalone: 서버 실행에 필요한 최소 파일
# .next/static: CSS, JS 번들 등 정적 에셋
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 위에서 생성한 비루트 사용자로 전환
USER nextjs

# Next.js standalone 서버의 기본 포트
EXPOSE 3000

# PORT, HOSTNAME: 컨테이너 환경에서의 포트 바인딩
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# server.js: standalone 모드에서 Next.js가 자동 생성하는 경량 서버
CMD ["node", "server.js"]
