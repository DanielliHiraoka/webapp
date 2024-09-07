import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Impacta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Bem vindo a Loja Online do Grupo Impacta</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/register">
            <div className={styles.card}>
              <h2>Cadastrar &rarr;</h2>
              <p>Seu primeiro acesso?</p>
              <p>Faça o seu cadastro.</p>
            </div>
          </Link>

          <Link href="/login">
            <div className={styles.card}>
              <h2>Login &rarr;</h2>
              <p>Já tem uma conta?</p> <p> Faça o seu login.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
