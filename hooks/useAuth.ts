/**
 * useAuth 훅
 * 
 * 이 훅은 현재 로그인한 사용자의 정보를 얻거나,
 * 로그인/로그아웃 동작을 하는 데 사용합니다.
 * 
 * 비유: 스마트폰의 "설정 > 계정" 정보를 어디서나 쉽게 접근할 수 있는 것처럼,
 * 이 훅을 사용하면 어떤 컴포넌트에서든 사용자 정보를 얻을 수 있습니다.
 */

"use client"; // 이 파일은 클라이언트에서만 실행됩니다 (서버에서 X)

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuth = () => {
  // 상태 1: 현재 로그인한 사용자 정보
  const [user, setUser] = useState<User | null>(null);

  // 상태 2: 로딩 중인지 여부 (데이터를 받아오는 중인지)
  const [loading, setLoading] = useState(true);

  // 상태 3: 에러 발생 시 에러 메시지
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 처음 렌더링될 때, 현재 로그인 사용자 정보를 가져옵니다
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Supabase에서 현재 세션(로그인 정보)을 가져옵니다
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        // 세션이 있으면 사용자 정보 저장
        setUser(session?.user || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "인증 확인 실패");
      } finally {
        // 로딩 완료
        setLoading(false);
      }
    };

    checkAuth();

    // Supabase의 인증 상태 변화를 감지합니다 (로그인/로그아웃 등)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // 컴포넌트가 제거될 때 구독 해제
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,
  };
};
