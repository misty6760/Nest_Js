// @ts-check

// ESLint 설정 파일
// 이 파일은 프로젝트의 코드 품질과 스타일을 관리하기 위한 ESLint 규칙을 정의합니다.

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // 이 파일 자체는 린팅에서 제외
    ignores: ['eslint.config.mjs'],
  },
  // ESLint 기본 추천 설정 적용
  eslint.configs.recommended,
  // TypeScript ESLint 추천 설정 적용
  ...tseslint.configs.recommendedTypeChecked,
  // Prettier 플러그인 추천 설정 적용
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      // 전역 변수 설정 (Node.js와 Jest 환경)
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // 커스텀 규칙 설정
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // any 타입 허용
      '@typescript-eslint/no-floating-promises': 'warn', // 처리되지 않은 프로미스에 대해 경고
      '@typescript-eslint/no-unsafe-argument': 'warn', // 안전하지 않은 인자 사용에 대해 경고
      '@typescript-eslint/no-unsafe-assignment': 'off', // 안전하지 않은 할당 허용
      'prettier/prettier': ['error', { endofLine: 'auto' }], // Prettier 규칙 적용, 줄 끝 문자 자동 설정
    },
  },
);
