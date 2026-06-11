/**
 * 로그인 페이지 (/auth/login)
 * 
 * 사용자가 Google 계정으로 로그인하는 페이지입니다.
 * 아직 계정이 없으면 자동으로 회원가입도 처리합니다.
 */

"use client"; // 이 페이지는 클라이언트에서만 실행됩니다

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // 만약 이미 로그인된 사용자면, 대시보드로 자동으로 이동
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Google 로그인 버튼 클릭 핸들러
  const handleGoogleLogin = async () => {
    try {
      // Supabase를 통해 Google OAuth 로그인 시작
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        // 로그인 후 돌아올 페이지 주소
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        console.error("Google login error:", error);
      }
    } catch (err) {
      alert("로그인 중 오류가 발생했습니다.");
      console.error("Login error:", err);
    }
  };

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        {/* 카드 컨테이너 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">시작하기</h1>
            <p className="text-gray-600 text-sm">
              Google 계정으로 쉽게 시작하세요
            </p>
          </div>

          {/* Google 로그인 버튼 */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 h-12 rounded-lg flex items-center justify-center gap-3 font-medium transition-colors"
          >
            {/* Google 로고 */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google로 로그인 / 가입하기
          </Button>

          {/* 약관 동의 문구 */}
          <p className="text-center text-xs text-gray-500 mt-6">
            계속 진행하면 서비스 약관에 동의합니다
          </p>

          {/* 약관 링크 */}
          <div className="flex justify-center gap-4 mt-4 text-xs">
            <a href="/terms" className="text-blue-600 hover:underline">
              이용약관
            </a>
            <span className="text-gray-300">|</span>
            <a href="/privacy" className="text-blue-600 hover:underline">
              개인정보처리방침
            </a>
          </div>
        </div>

        {/* 추가 정보 */}
        <p className="text-center text-xs text-gray-600 mt-6">
          이메일 지원: support@example.com
        </p>
      </div>
    </div>
  );
}
