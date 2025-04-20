// 애플리케이션의 환경 설정 인터페이스
// 필요한 환경 설정 값들의 타입을 정의합니다.
export interface Configuration {
    DB_URI: string;      // MongoDB 연결 URI
    PORT: number;        // 서버 포트 번호
    SECRET_TOKEN: string; // JWT 토큰 암호화에 사용되는 비밀키
}
