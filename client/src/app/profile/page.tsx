"use client";
import { getCurrentUser } from "./actions/account.actions";
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Аккаунт</h1>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Аккаунт</h1>
      <p>Здесь вы можете управлять своим аккаунтом.</p>
      {user ? (
        <>
          <h2>ID пользователя {user.id}</h2>
          <h2>Имя пользователя {user.name}</h2>
          <h2>Почта {user.email}</h2>
        </>
      ) : (
        <p>Пользователь не найден</p>
      )}
    </div>
  );
}
