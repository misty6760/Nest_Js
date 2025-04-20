// JWT 토큰의 기본 페이로드 타입을 정의합니다.
export type JwtPayload = {
    id: string;        // 사용자의 고유 식별자
    nickname: string;  // 사용자의 닉네임
};

// 액세스 토큰의 페이로드 타입을 정의합니다.
// JwtPayload를 상속받아 기본 페이로드 정보를 포함합니다.
export type AccessTokenPayload = {} & JwtPayload;
