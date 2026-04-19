# nupamo.github.io

nupamo의 개인 링크 및 프로젝트 아카이브 사이트입니다. VRChat 관련 프로젝트, 사진, 간단한 기록을 한 곳에서 보여주는 정적 웹앱이며, 다국어 콘텐츠 탐색과 검색 기능을 제공합니다.

## 주요 기능

- 프로필, 프로젝트, 사진을 한 화면에서 탐색
- `project`, `photo` 카테고리 필터링
- 제목 및 태그 기반 검색
- 한국어, 영어, 일본어, 중국어 콘텐츠 지원
- Markdown 기반 콘텐츠 관리
- 외부 링크(프로젝트 페이지, X 게시물 등) 연결

## 기술 스택

- React 19
- TypeScript
- Vite
- React Router
- Framer Motion
- React Markdown
- Tailwind CSS 4
- Lucide React

## 프로젝트 구조

```text
src/
├─ content/          # Markdown 기반 프로젝트/사진 콘텐츠
├─ App.tsx           # 라우팅, 목록/상세 UI, 다국어 처리
├─ main.tsx          # 앱 진입점
public/
├─ profile.jpg       # 프로필 이미지
├─ *.jpg, *.png      # 썸네일 및 사진 리소스
```

## 콘텐츠 관리 방식

이 프로젝트는 `src/content/*.md` 파일을 기반으로 콘텐츠를 구성합니다.

각 Markdown 파일은 다음과 같은 frontmatter를 사용합니다.

```md
---
title: "VRCTI - VRChat Type Indicator"
date: "2026-04-02"
category: "project"
tags: [Web]
link: "https://nupamo.github.io/vrcti/"
thumbnail: "https://nupamo.github.io/vrcti/thumb.png"
---
```

다국어 문서는 파일명 규칙으로 구분합니다.

- 기본 한국어: `post-name.md`
- 영어: `post-name.en.md`
- 일본어: `post-name.jp.md`
- 중국어: `post-name.zh.md`

## 개발 환경 실행

```bash
pnpm install
pnpm dev
```

기본 개발 서버는 Vite를 사용합니다.

## 빌드

```bash
pnpm build
```

빌드 결과물은 `dist/`에 생성됩니다.

## 배포 메모

- 저장소는 GitHub Pages 배포를 염두에 두고 구성되어 있습니다.
- `public/CNAME`과 루트 `CNAME` 파일이 포함되어 있어 커스텀 도메인 연결을 유지할 수 있습니다.
- 라우팅은 정적 호스팅 환경을 고려해 `HashRouter`를 사용합니다.

## 이런 사람에게 유용합니다

- 개인 포트폴리오와 프로젝트 링크를 가볍게 정리하고 싶은 사람
- Markdown 기반으로 콘텐츠를 직접 관리하고 싶은 사람
- 정적 호스팅 환경에서 다국어 개인 사이트를 운영하고 싶은 사람

## 라이선스

별도 라이선스가 명시되어 있지 않다면 저장소 소유자의 정책을 따릅니다.
