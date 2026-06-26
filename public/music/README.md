# 배경 음악 (BGM)

메인 페이지 우측 하단 토글이 재생하는 음원 파일을 여기에 둡니다.

- **파일명:** `bossa-nova.mp3` (이 이름 그대로 넣어야 동작합니다)
- **경로:** `public/music/bossa-nova.mp3` → 사이트에서는 `/music/bossa-nova.mp3`

## 권장 사항

- 가사 없는 잔잔한 보사노바 / 인스트루멘탈 루프
- **라이선스/로열티프리 음원만** 사용 (Pixabay Music, Free Music Archive, YouTube Audio Library 등)
- 루프 재생되므로 자연스럽게 이어지는 트랙이면 좋음
- 파일 용량은 가볍게 (2~4MB 권장)

파일을 넣으면 별도 코드 수정 없이 바로 재생됩니다.
참조 위치: `src/components/MusicPlayer.astro`
