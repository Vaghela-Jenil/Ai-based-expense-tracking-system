"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PageLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events?.on("routeChangeStart", start);
    router.events?.on("routeChangeComplete", end);
    router.events?.on("routeChangeError", end);

    return () => {
      router.events?.off("routeChangeStart", start);
      router.events?.off("routeChangeComplete", end);
      router.events?.off("routeChangeError", end);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
}
