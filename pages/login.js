import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Permite o envio de cookies com a requisição
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o ID do usuário no localStorage
        localStorage.setItem('user_id', data.user_id);
        console.log('User ID armazenado:', localStorage.getItem('user_id'));

        setMessage('Login realizado com sucesso!');
        setTimeout(() => {
          // Redireciona sempre para a Home
          router.push('/');
        }, 1500);
      } else {
        setMessage(data.error || 'Erro desconhecido!');
      }
    } catch (error) {
      setMessage('Erro na conexão com o servidor.');
      console.error('Erro ao tentar logar:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>Entrar</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
