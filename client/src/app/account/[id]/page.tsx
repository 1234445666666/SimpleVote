interface Props {
  params: {
    id: string;
  };
}

async function getUserData(id: string) {
  const res = {
    id: 1,
    name: "John Doe",
    email: "T9oTt@example.com",
  };
  return res;
}

export default async function AccountPage({ params }: Props) {
  const user = await getUserData(params.id);

  return (
    <div>
      <h1>Аккаунт #{user.id}</h1>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
