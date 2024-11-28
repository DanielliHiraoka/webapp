import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin.module.css";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError("Usuário não autenticado!");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Id": userId,
          },
        });

        if (response.status === 401) {
          setError("Autenticação necessária. Por favor, faça login novamente.");
          localStorage.removeItem("user_id");
          router.push("/login");
        } else if (response.status === 403) {
          setError("Acesso negado. Você não tem privilégios de administrador.");
          router.push("/");
        } else if (!response.ok) {
          throw new Error("Erro ao buscar usuários.");
        } else {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>{error}</p>
        <button onClick={() => router.push("/")}>Voltar para Home</button>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Gerenciar Usuários</h1>
      <button className={styles.backButton} onClick={() => router.push("/")}>
        Voltar para Home
      </button>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone || "Não informado"}</td>
              <td>
                {user.address
                  ? `${user.address}, ${user.city}, ${user.state}, ${user.postal_code}`
                  : "Não informado"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
