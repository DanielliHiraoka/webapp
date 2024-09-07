import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css'; // Importando o arquivo CSS

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login realizado com sucesso!');
                router.push('/');
            } else {
                setMessage(data.message || 'Erro desconhecido!');
            }
        } catch (error) {
            setMessage('Erro na conexão com o servidor.');
        }
    };

    return (
        <div className={styles.container}>
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.inputField}
                />
                <button type="submit" className={styles.button}>Login</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}
