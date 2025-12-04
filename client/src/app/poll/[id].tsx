import { useRouter } from "next/router";

export default function PollPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Опрос #{id}</h1>
      <p>ID опроса: {id}</p>
    </div>
  );
}
