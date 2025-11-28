interface Props {
  params: {
    id: string;
  };
}

async function getUserData(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  return res.json();
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
