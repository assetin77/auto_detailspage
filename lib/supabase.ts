/**
 * Supabase 클라이언트 설정 파일
 * 
 * 이 파일은 Supabase와 연결하기 위한 기본 설정입니다.
 * 마치 "전화 번호를 저장해두고 필요할 때마다 전화하는 것"처럼,
 * 이 파일에서 설정한 클라이언트를 여러 곳에서 재사용합니다.
 */

import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 필요한 정보를 가져옵니다
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase 클라이언트 생성
// - supabaseUrl: Supabase 프로젝트의 주소
// - supabaseKey: Supabase 프로젝트의 API 키
export const supabase = createClient(supabaseUrl, supabaseKey);
