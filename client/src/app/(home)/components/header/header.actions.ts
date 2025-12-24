import { useRouter } from "next/navigation";

export function useHeaderActions() {
  const router = useRouter();

  const login = () => router.push("/login");
  const register = () => router.push("/registration");
  const goToProfile = () => router.push("/profile");

  return {
    login,
    register,
    goToProfile,
  };
}
