import { useRouter } from "next/router";

export default function AccountPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Аккаунт #{id}</h1>
      <p>ID пользователя: {id}</p>
    </div>
  );
}
