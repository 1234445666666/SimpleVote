"use client";
import { getCurrentUser } from "./actions/account.actions";
import React, { useState, useEffect } from "react";
import "./style.css";

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
      <div className="account-container-loading">
        <h1 className="page-title">Аккаунт</h1>
        <p className="page-description">Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">
        <button className="back-button" onClick={() => window.history.back()}>
          Назад
        </button>
        <h1 className="page-title">Аккаунт</h1>
        <p className="page-description">
          Здесь вы можете управлять своим аккаунтом
        </p>

        {user ? (
          <div className="user-info-section">
            <div className="user-info-item">
              <div className="user-info-icon">#</div>
              <div className="user-info-content">
                <h3>ID пользователя</h3>
                <p>{user.id}</p>
              </div>
            </div>

            <div className="user-info-item">
              <div className="user-info-icon">👤</div>
              <div className="user-info-content">
                <h3>Имя пользователя</h3>
                <p>{user.name}</p>
              </div>
            </div>

            <div className="user-info-item">
              <div className="user-info-icon">@</div>
              <div className="user-info-content">
                <h3>Почта</h3>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">
            <p>Пользователь не найден</p>
          </div>
        )}
      </div>
    </div>
  );
}
