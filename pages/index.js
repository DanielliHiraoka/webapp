import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

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
          <li><Link href="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link href="/catalog">Animais Disponíveis</Link></li>
              <li><Link href="/profile">Minha Conta</Link></li>
              <li>
                <a href="#" onClick={() => {
                  localStorage.removeItem('user_id'); 
                  setIsAuthenticated(false); 
                }}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/register">Cadastre-se</Link></li>
              <li><Link href="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem-vindo à nossa Ong de Adoção de Gatinhos
        </h1>

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
              <p>Este elegante gato preto e branco é um item indispensável para quem ama felinos!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
