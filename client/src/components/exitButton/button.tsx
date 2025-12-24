"use client";
import { useRouter } from "next/navigation";

export default function ExitButton() {
  const router = useRouter();
  return (
    <button className="exit-toggle" onClick={() => router.push("/")}>
      <span className="cross">✕</span>
      <span className="text">EXIT</span>
    </button>
  );
}
