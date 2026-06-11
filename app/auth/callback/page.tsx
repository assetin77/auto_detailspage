/**
 * Google OAuth 콜백 페이지 (/auth/callback)
 * 
 * 사용자가 Google에서 로그인한 후,
 * Supabase가 이 페이지로 돌려보냅니다.
 * 
 * 역할: Google의 인증 코드를 처리하고 세션을 생성합니다.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL에서 Supabase 세션 정보를 자동으로 추출하고 설정합니다
        // 예: ?code=... 형태의 파라미터를 처리
        await supabase.auth.exchangeCodeForSession(window.location.hash);

        // 세션 설정 후, 대시보드로 이동합니다
        router.push("/dashboard");
      } catch (error) {
        console.error("Auth callback error:", error);
        // 에러가 발생하면 로그인 페이지로 돌아갑니다
        router.push("/auth/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
