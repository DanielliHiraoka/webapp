import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin.module.css";

const AdminFormsPage = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProposals = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError("Usuário não autenticado!");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/api/adoption-proposals", {
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
          throw new Error("Erro ao buscar formulários.");
        } else {
          const data = await response.json();
          setProposals(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
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
      <h1 className={styles.adminTitle}>Formulários Recebidos</h1>
      <button className={styles.backButton} onClick={() => router.push("/")}>
        Voltar para Home
      </button>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Gato</th>
            <th>Razão</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.id}</td>
              <td>{proposal.name}</td>
              <td>{proposal.contact}</td>
              <td>{proposal.catName || "Não informado"}</td>
              <td>{proposal.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFormsPage;
