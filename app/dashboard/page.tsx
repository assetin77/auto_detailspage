/**
 * 대시보드 페이지 (/dashboard)
 * 
 * 로그인 후 사용자가 보는 메인 페이지입니다.
 * 로그인하지 않은 사용자는 로그인 페이지로 자동 이동합니다.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 로그아웃 후 로그인 페이지로 이동
      router.push("/auth/login");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
      console.error("Logout error:", error);
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

  // 로그인하지 않은 상태 (이미 리다이렉트되므로 보통 여기에 도달하지 않음)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* 로고/서비스명 */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                상세페이지_기획_생성기
              </h1>
            </div>

            {/* 프로필 메뉴 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-auto"
                >
                  {/* 사용자 프로필 사진 */}
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* 사용자 이름 */}
                  <span className="text-gray-900 font-medium">
                    {user.user_metadata?.full_name || user.email}
                  </span>

                  {/* 드롭다운 화살표 */}
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              {/* 드롭다운 메뉴 */}
              <DropdownMenuContent align="end" className="w-56">
                {/* 사용자 정보 표시 */}
                <div className="px-4 py-3 text-sm border-b border-gray-200">
                  <p className="font-semibold text-gray-900">
                    {user.user_metadata?.full_name}
                  </p>
                  <p className="text-gray-600 text-xs">{user.email}</p>
                </div>

                {/* 메뉴 항목 */}
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer"
                >
                  설정
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/help")}
                  className="cursor-pointer"
                >
                  도움말
                </DropdownMenuItem>

                {/* 로그아웃 버튼 */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            환영합니다! 👋
          </h2>

          <p className="text-gray-600 mb-6">
            {user.user_metadata?.full_name}님, 서비스를 이용해주셔서 감사합니다!
          </p>

          {/* 사용자 정보 표시 */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">이메일</p>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">계정 생성일</p>
              <p className="text-gray-900">
                {new Date(user.created_at || "").toLocaleDateString("ko-KR")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">
                마지막 로그인
              </p>
              <p className="text-gray-900">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleDateString("ko-KR")
                  : "지금이 첫 로그인입니다"}
              </p>
            </div>
          </div>

          {/* 다음 단계 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              다음 단계
            </h3>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/projects")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                새 프로젝트 생성
              </Button>

              <Button
                onClick={() => router.push("/docs")}
                variant="outline"
                className="w-full"
              >
                문서 보기
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
