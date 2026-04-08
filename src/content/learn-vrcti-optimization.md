---
title: "VRCTI: 지표 시스템 설계 및 배포 최적화"
date: "2026-04-02"
category: "learn"
tags: [VRChat, Algorithm, Deployment]
---

### 프로젝트 개요
VRChat 사용자들의 성향을 분석하는 VRCTI 지표 시스템을 구축했습니다.

### 주요 학습 및 결정 사항 (Compound)
1.  **지표 구조의 정립:** `E/I` (Explorer/Inside), `S/C` (Sync/Concept), `D/G` (Deep/Gamer), `A/U` (Adapt/Unique) 4개 축으로 시스템을 확정했습니다. 단순한 분류를 넘어 가중치 기반 스코어링을 도입했습니다.
2.  **데이터 무결성:** 결과 코드 생성 순서를 `E -> S -> D -> A`로 고정하여 결과 데이터의 일관성을 확보했습니다.
3.  **배포 자동화 지식:** GitHub Pages 배포 시 리포지토리 이름의 대소문자 구분(case-sensitivity) 이슈와 Vite base path 설정의 중요성을 학습했습니다.
4.  **사용자 경험(UX):** 'Adapt'(사회적 조화)와 'Unique'(개인적 창의성)의 차이를 명확히 하기 위해 상세 설명 모달을 추가하여 모호함을 해소했습니다.

### 향후 적용 포인트
- 대소문자 이슈는 향후 모든 리포지토리 생성 시 소문자 통일을 원칙으로 함.
- Vite 프로젝트 배포 프로세스 템플릿화.
