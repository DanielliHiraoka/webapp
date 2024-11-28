import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false); // Estado para exibir submenu

  useEffect(() => {
    // Obter o user_id do localStorage
    const userId = localStorage.getItem("user_id");
    console.log("User ID armazenado no localStorage:", userId);

    if (userId) {
      setIsAuthenticated(true);

      // Verificar se o usuário é administrador
      fetch("http://127.0.0.1:5000/api/users/admin-check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Id": userId, // Passa o ID do usuário logado
        },
      })
        .then((response) => {
          console.log("Admin Check Status:", response.status); // Log do status HTTP
          return response.json(); // Retorna os dados como JSON
        })
        .then((data) => {
          if (data.message === "Usuário é administrador") {
            setIsAdmin(true);
            console.log("Usuário identificado como administrador");
          } else {
            console.log("Usuário não é administrador:", data.error);
          }
        })
        .catch((error) => console.error("Erro ao verificar status de admin:", error));
    }
  }, []);

  console.log("Estado atual de isAuthenticated:", isAuthenticated); // Log do estado de autenticação
  console.log("Estado atual de isAdmin:", isAdmin); // Log do estado de administrador

  return (
    <div className={styles.container}>
      <Head>
        <title>Ong de Adoção de Gatinhos</title>
        <meta name="description" content="Página inicial da nossa ONG de adoção de gatinhos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Barra de navegação */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>Ong de Adoção de Gatinhos</div>
        <ul className={styles.navbarMenu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/catalog">Animais Disponíveis</Link>
              </li>
              <li>
                <Link href="/profile">Minha Conta</Link>
              </li>
              {isAdmin && (
                <li
                  className={styles.adminMenu}
                  onMouseEnter={() => setShowAdminMenu(true)}
                  onMouseLeave={() => setShowAdminMenu(false)}
                >
                  <span>Administração</span>
                  {showAdminMenu && (
                    <div className={styles.adminSubMenu}>
                      <Link href="/admin/users">Cadastro de Usuários</Link>
                      <Link href="/admin/forms">Formulários Recebidos</Link>

                    </div>
                  )}
                </li>
              )}
              <li>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("user_id"); // Remove o ID do localStorage
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                    console.log("Logout realizado. Estados redefinidos."); // Log ao realizar logout
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/register">Cadastre-se</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Bem-vindo à nossa Ong de Adoção de Gatinhos</h1>

        <div className={styles.hero}>
          <Image
            src="/images/loja-online.jpg"
            alt="Loja Online"
            width={600}
            height={400}
            className={styles.heroImage}
          />
        </div>

        <section className={styles.featuredSection}>
          <h2>Gatinhos em Destaque</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <Image
                src="/images/produto1.jpg"
                alt="Produto 1"
                width={300}
                height={200}
                className={styles.productImage}
              />
              <h3>Gato Charmoso &rarr;</h3>
              <p>Traga a fofura para sua casa com este gato adorável!</p>
            </div>

            <div className={styles.card}>
              <Image
                src="/images/produto2.jpg"
                alt="Produto 2"
                width={300}
                height={200}
                className={styles.productImage}
              />
              <h3>Gato Fofo &rarr;</h3>
              <p>Este gato creme é o companheiro perfeito para seus momentos de relaxamento.</p>
            </div>

            <div className={styles.card}>
              <Image
                src="/images/produto3.jpg"
                alt="Produto 3"
                width={300}
                height={200}
                className={styles.productImage}
              />
              <h3>Gato Pelúcia &rarr;</h3>
              <p>Este elegante gato preto e branco é indispensável para quem ama felinos!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
